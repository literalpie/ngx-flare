import ActorSkinnable from "./ActorSkinnable";
export default class ActorImage extends ActorSkinnable {
    constructor();
    invalidateDrawable(): void;
    deformVertices: any;
    computeAABB(): Float32Array;
    skinVertices(vertices: any, dest: any): any;
    computeWorldVertices(bonesOnly: any): any[];
    dispose(actor: any, graphics: any): void;
    initialize(artboard: any, graphics: any): void;
    getVertices(graphics: any): any;
    draw(graphics: any): void;
    makeInstance(resetActor: any): ActorImage;
    copy(node: any, resetActor: any): void;
}
