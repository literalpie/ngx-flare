export default class ActorSkinnable {
    constructor();
    setSkin(skin: any): void;
    skin: any;
    connectedBones: any;
    isConnectedToBones: boolean;
    resolveComponentIndices(components: any): void;
    copy(node: any, resetActor: any): void;
}
