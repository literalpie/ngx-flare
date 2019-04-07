declare module 'flare' {
  export class Dispatcher {
    constructor();
    addEventListener(event: any, callback: any): void;
    removeEventListener(event: any, callback: any): boolean;
    dispatch(event: any, data: any, extraContext: any): void;
  }

  export class Actor extends Dispatcher {
    _Artboards: any[];
    _NestedActorAssets: any[];
    _Atlases: any[];
    constructor();
    getArtboard(name: any): any;
    dispose(graphics: any): void;
    initialize(graphics: any): void;
    makeInstance(): any;
    animations: any;
    error?: any;
  }
  export class AnimationInstance extends Dispatcher {
    constructor(actor: any, animation: any);
    loop: any;
    time: any;
    isOver: boolean;
    reset(): void;
    advance(seconds: any): any[];
    apply(actor: any, mix: any): void;
  }

  export class Graphics {
    _Canvas: any;
    _ViewTransform: any;
    _Cleanup: any;
    _SkSurface: any;
    _GLContext: any;
    _SkCanvas: any;
    _ClearPaint: any;
    _SkContext: any;
    constructor(canvas: any);
    initialize(cb: any, staticPath?: any|void): void;
    init(): void;
    updateBackendSurface(): void;
    save(): void;
    restore(): void;
    transform(matrix: any): void;
    canvas: any;
    ctx: any;
    dispose(): void;
    width: any;
    height: any;
    clear(color: any): void;
    drawPath(path: any, paint: any): void;
    drawRect(x: any, y: any, width: any, height: any, paint: any): void;
    setView(matrix: any): void;
    addPath(path: any, addition: any, matrix: any): void;
    makeImage(bytes: any): any;
    makeImageShader(image: any): any;
    makePath(ephemeral: any): any;
    makeVertices(pts: any, uvs: any, indices: any): any;
    drawVertices(vertices: any, paint: any): void;
    copyPath(path: any, ephemeral: any): any;
    pathEllipse(path: any, x: any, y: any, radiusX: any, radiusY: any, startAngle: any, endAngle: any, ccw: any): void;
    static destroyPath(path: any): void;
    makeLinearGradient(start: any, end: any, colors: any, stops: any): any;
    makeRadialGradient(center: any, radius: any, colors: any, stops: any): any;
    destroyRadialGradient(gradient: any): void;
    destroyLinearGradient(gradient: any): void;
    makePaint(ephemeral: any): any;
    setPaintFill(paint: any): void;
    setPaintColor(paint: any, color: any): void;
    setPaintShader(paint: any, shader: any): void;
    static setPaintBlendMode(paint: any, blendMode: any): void;
    setPathFillType(path: any, fillRule: any): void;
    static setPaintStrokeCap(paint: any, cap: any): void;
    static setPaintStrokeJoin(paint: any, join: any): void;
    static setPaintStroke(paint: any): void;
    destroyPaint(paint: any): void;
    clipPath(path: any): void;
    flush(): void;
    viewportWidth: any;
    viewportHeight: any;
    setSize(width: any, height: any): boolean;
    static pointPath(path: any, points: any, isClosed: any): any;
    static trimPath(path: any, startT: any, stopT: any, complement: any): any;
    static trimPathSync(path: any, startT: any, stopT: any, complement: any): any;
  }

  export class ActorLoader {
    load(url: string, fn: (actor: Actor)=>void ): void;
  }
}
