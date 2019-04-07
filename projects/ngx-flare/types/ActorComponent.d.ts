export default class ActorComponent {
    constructor();
    parent: any;
    onDirty(dirt: any): void;
    initialize(actor: any, graphics: any): void;
    dispose(actor: any, graphics: any): void;
    update(dirt: any): void;
    advance(seconds: any): void;
    resolveComponentIndices(components: any): void;
    completeResolve(): void;
    copy(component: any, resetActor: any): void;
    getCustomProperty(name: any): any;
}
