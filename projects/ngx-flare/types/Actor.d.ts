import Dispatcher from "./Dispatcher";
import ActorArtboard from "./ActorArtboard";
export default class Actor extends Dispatcher {
    _Artboards: ActorArtboard[];
    _NestedActorAssets: any[];
    _Atlases: any[];
    constructor();
    getArtboard(name: any): ActorArtboard;
    dispose(graphics: any): void;
    initialize(graphics: any): void;
    makeInstance(): ActorArtboard;
    readonly animations: any[];
}
