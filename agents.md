# AGENTS.md

This file gives guidance to coding agents working in this repository.

## Project Overview

This is a **Remotion** project, built with React to create deterministic videos programmatically.

Key principles:
- Keep all video logic deterministic.
- Never use `Math.random()` for animation logic; use seeded Remotion utilities instead.
- Drive motion from frame numbers so renders are reproducible.
- The same input should always produce the same output.

## Project Structure

```text
src/
├── index.ts           # Entry point that registers the root component
├── Root.tsx           # Composition container with <Composition> definitions
├── HelloWorld.tsx     # Example animation component
└── index.css          # Tailwind styles
```

## Composition Pattern

Each `Composition` in `src/Root.tsx` defines a renderable video:
- `id`: identifier used by the CLI
- `component`: React component to render
- `durationInFrames`: total length of the video
- `width` / `height`: render resolution
- `defaultProps`: initial props for the component

Inside components:
- Use `useCurrentFrame()` to read the current frame.
- Use `interpolate()` or `spring()` to animate values over time.
- Use `useVideoConfig()` when you need fps, duration, width, or height.

## Common Commands

```bash
npm start
npm run dev
npm run build
npx remotion render HelloWorld
npx remotion still HelloWorld
npm run test
```

## Adding New Compositions

1. Create a new component in `src/`, such as `src/MyAnimation.tsx`.
2. Register it in `src/Root.tsx` with a `<Composition />`.
3. Keep animations frame-based and deterministic.

Example:

```tsx
import {interpolate, useCurrentFrame} from 'remotion';

export const MyAnimation: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return <div style={{opacity}}>Hello</div>;
};
```

## Useful APIs

- `useCurrentFrame()` for the current frame number.
- `interpolate()` for smooth value transitions.
- `spring()` for spring-like motion.
- `<AbsoluteFill />` for full-screen layering.
- `<Sequence />` for time-based visibility.
- `<Series />` for sequential content.
- `staticFile()` for assets in `public/`.
- `Video`, `Audio`, `Img`, and `Gif` for media elements.

## Tailwind

Tailwind is available and can be used directly in JSX with `className`.
Project styles are configured in `tailwind.config.js` and `postcss.config.js`.

## Rendering

- Local preview: `npm start` or `npm run dev`
- Final render: `npm run build`
- Cloud rendering: follow Remotion Lambda docs if needed

## Working Rules

- Prefer small, focused changes.
- Preserve deterministic behavior.
- Avoid introducing hidden sources of nondeterminism.
- Match the existing project structure and naming when adding files.
