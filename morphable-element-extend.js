import {MorphableElement} from './morphable-element.js';

export class MorphableElementExtend extends MorphableElement {
  constructor() {
    super();
    this.message = undefined;
    this.count = undefined;
  }
}

window.customElements.define('morphable-element-extend', MorphableElementExtend);