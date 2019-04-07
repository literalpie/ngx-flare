# NgxFlare

A simple project that simplifies the usage of [Flare](https://www.2dimensions.com/about-flare) in Angular applications.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Flare JS

This project uses [Flare JS](https://github.com/2d-inc/Flare-JS).
Unfortunately, that project isn't available on npm ([yet](https://github.com/2d-inc/Flare-JS/pull/17#issuecomment-478138690)).
I opted to go with the quick-and-dirty approach of including a minified build of flarejs in a deps folder.

## Typescript
Flare JS does not use typescript or include declarations for typescript.
Some declaration files are included in this project, but they are very rough and shouldn't be trusted.
When Flare JS gets released to npm, I'll use [dts-gen](https://github.com/Microsoft/dts-gen) to do this better.

## Component Usage
in your module:
`imports: [NgxFlareModule]`
in a component:
`<ngx-flare source="assets/Cat.flr" [playPosition]="playPosition" [playing]="true" animation="happy"  style="height: 100%; width: 100%;"></ngx-flare>`

### Inputs
`source` - A string that points to the `flr` file with the animation

`playing` - Used to play or pause the animation

`animation` - The name of the animation in the `flr` file. If left blank, the first animation will be used.

`playPosition` - The position of the animation in seconds. This can be used to set the position to anything you want.
> I played with making an `playPositionChange` output to allow for two-way binding, but that caused performance issues

## FlarePlayer
This project also includes a class that conforms to the `AnimationPlayer` interface used within Angular.
This is great for if you want even more control over the animation.
I could outline it here, but if you're planning on going that deep, I trust you to look at the code and figure it out yourself.
