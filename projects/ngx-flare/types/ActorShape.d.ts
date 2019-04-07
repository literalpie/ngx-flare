import ActorDrawable from "./ActorDrawable";
export default class ActorShape extends ActorDrawable {
    constructor(actor: any);
    paths: any;
    addFill(fill: any): void;
    addStroke(stroke: any): void;
    stroke: any;
    initialize(actor: any, graphics: any): void;
    computeAABB(): any;
    dispose(actor: any, graphics: any): void;
    draw(graphics: any): void;
    invalidatePath(): void;
    getShapePath(graphics: any): any;
    update(dirt: any): void;
    completeResolve(): void;
    makeInstance(resetActor: any): any;
}
