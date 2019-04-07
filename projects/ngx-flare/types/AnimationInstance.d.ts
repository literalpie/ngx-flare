import Dispatcher from "./Dispatcher";
import Actor from "./Actor";
export default class AnimationInstance extends Dispatcher {
    constructor(actor: Actor, animation: any);
    loop: any;
    time: any;
    isOver: boolean;
    reset(): void;
    advance(seconds: any): any[];
    apply(actor: any, mix: any): void;
}
