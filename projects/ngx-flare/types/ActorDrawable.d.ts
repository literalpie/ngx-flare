import ActorNode from "./ActorNode";
export default class ActorDrawable extends ActorNode {
    constructor(actor: any);
    drawOrder: any;
    blendMode: any;
    isHidden: any;
    copy(node: any, resetActor: any): void;
    getClips(): any[];
    clip(graphics: any): void;
}
