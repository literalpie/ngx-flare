import ActorNode from "./ActorNode";
export default class ActorProceduralPath extends ActorNode {
    constructor(actor: any);
    initialize(actor: any, graphics: any): void;
    invalidatePath(): void;
    width: any;
    height: any;
    resolveComponentIndices(components: any): void;
    makeInstance(resetActor: any): any;
    getPathTransform(): any;
    getPathRenderTransform(): any;
    getPath(graphics: any): any;
    getPathAABB(): number[];
    copy(node: any, resetActor: any): void;
}
