# _Stinky splitter_

An auto-splitter for [_Gassy GaoGao_](https://web.archive.org/web/20250523104655/http://offgao.net/ggg/ggg/).

- Auto splits! Splits at goal, or at stage transitions.
- Tracks in-game timer.
- Resets when You Reset.

![Two windows shown side-by-side. On the left is Gassy GaoGao. The dragon protagonist is boosting himself towards an open door using his farts. On the right is a LiveSplit window, displaying several named splits, a real time of 51 seconds and in-game time of 47 seconds. A graph is showing that the run is currently ahead, but was behind at some point in the run.](media/demonstration.webp)

## Installation

Instructions for [*LiveSplit*](https://livesplit.org/).

### Simple

1. Click "Edit Splits" from the context menu.
2. Type in the game's name as "Gassy GaoGao" or「がっしーがおがお」
3. Click activate.

When changing settings, the auto-splitter will need to be restarted in order for changes to take æffect.

### Manual

Builds for all versions can be found in the [releases tab](https://codeberg.org/BunnyNabbit/stinky-splitter/releases).

1. Click "Edit Layout" from the context menu.
2. Add an "Auto Splitting Runtime" component from the "Control" category.
3. Double click on the new "Auto Splitting Runtime" row.
4. Set "Script Path" to the `stinky-splitter.wasm` file.

## Development

- `corepack enable pnpm`
- `pnpm install`

To build: `pnpm run asbuild:release`
