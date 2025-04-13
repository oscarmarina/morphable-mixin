import {dedupeMixin} from '@open-wc/dedupe-mixin';

// https://github.com/shoelace-style/shoelace/discussions/2339
// https://github.com/lit/lit/issues/4916

const MorphableBase = (Base) =>
  class Morphable extends Base {
    static createProperty(name, options) {
      if (options.reflectDefault) {
        options = {...options, wrapped: true};
      }
      super.createProperty(name, options);
    }

    _$changeProperty(name, oldValue, options) {
      oldValue = this.hasUpdated ? oldValue : undefined;
      super._$changeProperty(name, oldValue, options);
    }
  };

export const MorphableMixin = dedupeMixin(MorphableBase);
