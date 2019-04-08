import { ActorLoader, AnimationInstance, Graphics } from 'flare';
import { mat2d, vec2 } from 'gl-matrix';
import Actor from '../../types/Actor';
import ActorArtboard from '../../types/ActorArtboard';
import Animation from '../../types/Animation';
import {AnimationPlayer} from '@angular/animations';

export class FlarePlayer implements AnimationPlayer {
  parentPlayer = undefined;
  totalTime = 1.0;
  beforeDestroy?: () => any;

  private graphics: Graphics;
  private lastAdvanceTime?: number = undefined;
  private viewTransform: mat2d;
  private animationInstance?: AnimationInstance;
  private animation: Animation;
  private actor: Actor;
  private actorInstance: ActorArtboard;
  /** the path to the flare animation file */
  private animationPath: string;
  private animationName: string;
  private position?: number = undefined;
  private animationDuration = 0;
  playing = false;

  private onDoneFn = () => {};
  private onStartFn = () => {};
  private onDestroyFn = () => {};
  private positionChangeFn = (position: number) => {};

  /**
  * @param canvas - a canvas element object on the html page that's rendering this example.
  * @param ready - callback that's called after everything's been properly initialized.
  */
  constructor(canvas: HTMLCanvasElement, animationPath: string, animationName: string) {
    /** Build and initialize the Graphics object. */
    this.graphics = new Graphics(canvas);
    this.animationPath = animationPath;
    this.animationName = animationName;
  }

  onDone(fn: () => void): void {
    this.onDoneFn = fn;
  }
  onStart(fn: () => void): void {
    this.onStartFn = fn;
  }
  onDestroy(fn: () => void): void {
    this.onDestroyFn = fn;
  }
  init(): void {
    this.graphics.initialize(() => {
      this.viewTransform = mat2d.create();

      this.advance();

      /** Call-back. */
      this.load(this.animationPath, () => {
        if (this.playing) {
          this.scheduleAdvance();
        }
      });
    }, '');
  }
  hasStarted(): boolean {
    return this.position !== undefined;
  }
  play(): void {
    if (!this.hasStarted) {
      this.start();
    }
    this.scheduleAdvance();
    this.playing = true;
  }
  pause(): void {
    this.playing = false;
    this.lastAdvanceTime = undefined;
  }
  restart(): void {
    if (!this.playing) {
      this.position = 0;
    }
  }
  finish(): void {
    this.position = 1; // this should go to the end, not just 1
    this.onDoneFn();
  }
  destroy(): void {
    this.beforeDestroy();
    this.graphics.dispose();
    this.onDestroyFn();
  }
  reset(): void {
    this.position = undefined;
    this.lastAdvanceTime = undefined;
    this.playing = false;
  }
  setPosition(position: number): void {
    const starting = this.position === undefined;
    // don't set the position if the animation hasn't started yet and the new position is 0
    if (!starting || position > 0) {
      this.position = position;
      // this.positionChangeFn(this.position);
      this.advance(this.position);
      if (starting) {
        this.start();
      }
    }
  }
  getPosition(): number {
    return this.position || 0;
  }
  start() {
    this.onStartFn();
    this.position = 0;
    this.scheduleAdvance();
  }

  onPositionChange(fn: (position: number) => void) {
    this.positionChangeFn = fn;
  }

  /**
  * Advance the current viewport and, if present, the AnimationInstance and Actor.
  */
  private advance(time?: number) {
    this.setSize(window.innerWidth, window.innerHeight);

    let elapsed = 0;
    if (this.position === undefined) {
      this.start();
    }
    if (this.lastAdvanceTime) {
      const now = Date.now();
      elapsed = (now - this.lastAdvanceTime) / 1000.0;
      this.lastAdvanceTime = now;
    }

    const actor = this.actorInstance;

    if (this.animationInstance) {
      const ai = this.animationInstance;
      /** Compute the new time and apply it */
      ai.time = time || (this.position || 0) + elapsed || 0;
      ai.apply(this.actorInstance, 1.0);
      this.positionChangeFn(this.position);
      this.position = ai.time;
    }

    if (actor) {
      const graphics = this.graphics;

      const w = graphics.viewportWidth;
      const h = graphics.viewportHeight;
      const viewCenter = [w / 2, h / 2];
      const vt = this.viewTransform;
      vt[4] = (-viewCenter[0] / 2 + w / 2);
      vt[5] = (-viewCenter[1] / 2 + h / 2);
      /** Advance the actor to its new time. */
      actor.advance(elapsed);
    }

    this.draw(this.graphics);
    /** Schedule a new frame. */
    if (this.playing && (!this.animation || this.position < this.animation.duration || this.animation.loop)) {
      this.lastAdvanceTime = this.lastAdvanceTime || Date.now();
      this.scheduleAdvance();
    }
  }

  /**
  * Performs the drawing operation onto the canvas.
  *
  * @param graphics - the renderer.
  */
  private draw(graphics) {
    if (!this.actor) {
      return;
    }

    graphics.clear([0.8, 0.8, 0.8, 1.0]);
    graphics.setView(this.viewTransform);
    this.actorInstance.draw(graphics);
    graphics.flush();
  }

  /** Schedule the next frame. */
  private scheduleAdvance() {
    clearTimeout(0);
    window.requestAnimationFrame(() => {
      this.advance();
    });
  }

  /**
  * Loads the Flare file from disk.
  *
  * @param url - the .flr file location.
  * @param callback - the callback that's triggered upon a successful load.
  */
  private load(url: string, callback: (actor?: Actor) => void) {
    const loader = new ActorLoader();
    loader.load(url, (actor) => {
      if (!actor || actor.error) {
        callback(!actor ? null : actor.error);
      } else {
        this.setActor(actor);
        callback();
      }
    });
  }

  /**
  * Cleans up old resources, and then initializes Actors and Animations, storing the instance references for both.
  * This is the final step of the setup process for a Flare file.
  */
  private setActor(actor: Actor) {
    /** Cleanup */
    if (this.actor) {
      this.actor.dispose(this.graphics);
    }
    if (this.actorInstance) {
      this.actorInstance.dispose(this.graphics);
    }
    /** Initialize all the Artboards within this Actor. */
    actor.initialize(this.graphics);

    /** Creates new ActorArtboard instance */
    const actorInstance = actor.makeInstance();
    actorInstance.initialize(this.graphics);

    this.actor = actor;
    this.actorInstance = actorInstance;

    if (actorInstance) {
      /** ActorArtboard.initialize() */
      actorInstance.initialize(this.graphics);
      if (actorInstance._Animations.length) {
        this.animation = undefined;
        /** Instantiate the Animation. */
        if (this.animationName) {
          this.animation = actorInstance._Animations.find((animation) => animation._Name === this.animationName);
        } else {
          this.animation = actorInstance._Animations[0];
        }
        this.animationDuration = (this.animation && this.animation.duration || 0);
        if (!this.animation) {
          console.error('ERROR: Animation not found');
          return;
        }
        this.animationInstance = new AnimationInstance(actor, this.animation);

        if (!this.animationInstance) {
          console.log('NO ANIMATION IN HERE!?');
          return;
        }

      }
    }
  }

  /** Set the renderer's viewport to the desired width/height. */
  setSize(width, height) {
    this.graphics.setSize(width, height);
  }
}
