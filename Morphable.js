import {dedupeMixin} from '@open-wc/dedupe-mixin';

/**
 * ![Lit](https://img.shields.io/badge/lit-3.0.0-blue.svg)
 *
 * This mixin ensures that the property is reset to its initial value when the attribute is removed.
 * It applies to properties that have `reflect: true` and works even with those initialized as undefined, null, or false.
 *
 * ## Key Use Cases:
 *
 * 1. **Attributes**: The `attributeChangedCallback` is called first:
 *
 *    ```html
 *    <morphable-element message="Hello" active count="5">some light-dom</morphable-element>
 *    ```
 *
 * 2. **No Attributes - properties with values**: The `attributeChangedCallback` is called first:
 *
 *    ```html
 *    <morphable-element>some light-dom</morphable-element>
 *    ```
 *
 *    ```js
 *    // Initial properties:
 *    constructor() {
 *      super();
 *      this.message = 'Hiya';
 *      this.count = 11;
 *      this.active = false;
 *    }
 *    ```
 *
 * 3. **No attributes, properties are undefined**: The `connectedCallback` is called first:
 *
 *    ```html
 *    <morphable-element>some light-dom</morphable-element>
 *    ```
 *
 *    ```js
 *    // Initial properties:
 *    constructor() {
 *      super();
 *      this.message = undefined;
 *      this.count = undefined;
 *      this.active = false;
 *    }
 *    ```
 *
 * 4. **Direct property setting**: If the property is set directly rather than through an attribute, such as:
 *
 *    ```html
 *    <morphable-element .message="${message}" .active="${false}">some light-dom</morphable-element>
 *    ```
 *
 *    There is no straightforward way to determine the value used in the constructor. This is because
 *    the property is set directly on the instance after it has been constructed, bypassing the attribute
 *    reflection mechanism.
 */
const MorphableBase = (Base) =>
  class Morphable extends Base {
    #initialProperties = new Map();

    #setupInitialProperties() {
      const {elementProperties} =
        /** @type {import('./shared').Constructor & { elementProperties: Map<string, *> }} */ (
          this.constructor
        );

      elementProperties.forEach((v, k) => {
        if (v.reflect === true) {
          const initialProperty = {
            ...v,
            initialValue: this[k],
          };
          this.#initialProperties.set(k, initialProperty);
        }
      });
    }

    #ensureInitialProperties() {
      if (!this.#initialProperties.size) {
        this.#setupInitialProperties();
      }
    }

    connectedCallback() {
      this.#ensureInitialProperties();
      super.connectedCallback?.();
    }

    /**
     * @param {string} name
     * @param {string|null} old
     * @param {string|null} value
     */
    async attributeChangedCallback(name, old, value) {
      this.#ensureInitialProperties();

      if (value != null) {
        super.attributeChangedCallback?.(name, old, value);
        return;
      }

      const propertyDetails = this.#initialProperties.get(name) ?? {};

      const {initialValue, type} = propertyDetails;
      if (!(type === Boolean && !this[name])) {
        await this.updateComplete;
        if (initialValue != null && initialValue !== false) {
          this.setAttribute(name, initialValue);
        } else {
          this[name] = initialValue;
        }
      } else {
        super.attributeChangedCallback?.(name, old, value);
      }
    }
  };

export const MorphableMixin = dedupeMixin(MorphableBase);
