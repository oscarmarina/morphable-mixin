import {html, LitElement} from 'lit';
import {until} from 'lit/directives/until.js';
import {MorphableMixin} from './Morphable.js';
import {styles} from './morphable-element-styles.css.js';

export class MorphableElement extends MorphableMixin(LitElement) {
  static styles = styles;

  static properties = {
    message: {type: String, reflect: true},
    count: {type: Number, reflect: true},
    active: {type: Boolean, reflect: true},
  };

  constructor() {
    super();
    this.message = 'Hiya';
    this.count = 11;
    this.active = false;
  }

  connectedCallback() {
    super.connectedCallback?.();
    this.codeNode = this.querySelector('code');
  }

  render() {
    return html`
      <div><b>Change Properties</b></div>
      <div>
        message:
        <input
          .value=${this.message != null ? this.message : ''}
          @input="${({target}) => {
            this.message = target.value;
          }}" />
      </div>
      <div>
        active:
        <input
          type="checkbox"
          .checked=${this.active}
          @input="${({target}) => {
            this.active = target.checked;
          }}" />
      </div>
      <div>
        count:
        <button
          @click=${() => {
            this.count = (this.count ?? 0) + 1;
          }}>
          ${this.count}
        </button>
      </div>
      <div><b>Update Attributes</b></div>
      <div>
        <button
          @click="${() => {
            if (this.count != null) {
              this.setAttribute('count', String(this.count));
            }
            if (this.message != null) {
              this.setAttribute('message', this.message);
            }
            if (this.active) {
              this.setAttribute('active', '');
            }
          }}">
          set
        </button>
        <button
          @click="${() => {
            this.removeAttribute('message');
            this.removeAttribute('count');
            this.removeAttribute('active');
          }}">
          remove
        </button>
      </div>
      <div><b>Results</b></div>
      <ul>
        <li>
          message: attr = ${until(this.updateComplete.then(() => this.getAttribute('message')))},
          prop = ${this.message}
        </li>
        <li>
          count: attr = ${until(this.updateComplete.then(() => this.getAttribute('count')))}, prop =
          ${this.count}
        </li>
        <li>
          active: attr = ${until(this.updateComplete.then(() => this.getAttribute('active')))}, prop
          = ${this.active}
        </li>
      </ul>
      <slot></slot>
    `;
  }

  updated() {
    if (this.codeNode) {
      this.codeNode.textContent = '';
      this.codeNode.textContent = this.outerHTML;
    }
  }
}

window.customElements.define('morphable-element', MorphableElement);
