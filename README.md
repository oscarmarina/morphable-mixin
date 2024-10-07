![Lit](https://img.shields.io/badge/lit-3.0.0-blue.svg)

This mixin ensures that the property is reset to its initial value when the attribute is removed.

It applies to properties that have `reflect: true` and works even with those initialized as undefined, null, or false.

- [https://github.com/lit/lit/issues/4643](https://github.com/lit/lit/issues/4643)

- [Making Lit Components Morphable](https://www.konnorrogers.com/posts/2024/making-lit-components-morphable)

> [Playground demo](https://dainty-fenglisu-56ec38.netlify.app/)

<hr>

## Key Use Cases:

1. **Attributes**: The `attributeChangedCallback` is called first:

   ```html
   <morphable-element message="Hello" active count="5">some light-dom</morphable-element>
   ```

2. **No Attributes - properties with values**: The `attributeChangedCallback` is called first:

   ```html
   <morphable-element>some light-dom</morphable-element>
   ```

   ```js
   // Initial properties:
   constructor() {
     super();
     this.message = 'Hiya';
     this.count = 11;
     this.active = false;
   }
   ```

3. **No attributes, properties are undefined**: The `connectedCallback` is called first:

   ```html
   <morphable-element>some light-dom</morphable-element>
   ```

   ```js
   // Initial properties:
   constructor() {
     super();
     this.message = undefined;
     this.count = undefined;
     this.active = false;
   }
   ```

4. **Direct property setting**: If the property is set directly rather than through an attribute, such as:

   ```html
   <morphable-element .message="${message}" .active="${false}">some light-dom</morphable-element>
   ```

   There is no straightforward way to determine the value used in the constructor. This is because
   the property is set directly on the instance after it has been constructed, bypassing the attribute
   reflection mechanism.
