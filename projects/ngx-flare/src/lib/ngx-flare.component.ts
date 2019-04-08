import { Component, ViewChild, ElementRef, AfterViewInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FlarePlayer } from './flare-player';

@Component({
  selector: 'ngx-flare',
  template: `
    <canvas class="fill" id="canvas" #canvas></canvas>
  `,
  styles: ['.fill{width: 100%; height: 100%}']
})
export class NgxFlareComponent implements OnChanges, AfterViewInit {
  @ViewChild('canvas')
  canvas: ElementRef;

  @Input()
  source?: string;

  @Input()
  animation?: string;

  @Input()
  playing = true;

  @Input()
  set playPosition(position: number) {
    if (this.example) {
      this.example.setPosition(position);
    }
  }
  get playPosition() {
    return this.example.getPosition();
  }

  loaded = false;
  example: FlarePlayer;

  ngAfterViewInit() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.source || changes.animation) {
      if (this.example) {
        this.example.reset();
      }
      this.initializePlayer();
    }
    if (changes.playing) {
      this.playing ? this.example.play() : this.example.pause();
    }
  }

  initializePlayer() {
    this.example = new FlarePlayer(this.canvas.nativeElement, this.source, this.animation);
    this.example.init();
    this.example.setPosition(this.playPosition);
    if (this.playing) {
      this.example.play();
    }
  }
}
