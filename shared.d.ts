type CustomElement = HTMLElement & {
  adoptedCallback?(): void;
  attributeChangedCallback?(
    attributeName: string,
    oldValue: any,
    newValue: any,
    namespace?: any,
  ): void;
  connectedCallback?(): void;
  disconnectedCallback?(): void;
};

type Constructor<T = {}> = { new (...args: any[]): T } & Function;

export declare function MixinBase<T extends Constructor>(superclass: T): T & CustomElement;
