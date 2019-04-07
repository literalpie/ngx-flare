export default class Animation {
    _Artboard: any;
    _Components: any[];
    _TriggerComponents: any[];
    _Name: any;
    _FPS: number;
    _Duration: number;
    _Loop: boolean;
    constructor(artboard: any);
    readonly loop: boolean;
    readonly duration: number;
    triggerEvents(artboardComponents: any, fromTime: any, toTime: any, triggered: any): void;
    apply(time: any, artboard: any, mix: any): void;
}
