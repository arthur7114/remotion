# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Remotion** project — a React-based framework for creating videos programmatically. All video content is defined as deterministic React components rendered to MP4.

**Key principles:**
- All code must be deterministic (no `Math.random()` — use `random('seed')` from remotion)
- Components receive frame numbers and animate based on them
- Output is always the same for the same input (reproducible videos)

## Project Structure

```
src/
├── index.ts           # Entry point: registers Root component
├── Root.tsx           # Root composition container with <Composition> definitions
├── HelloWorld.tsx     # Example animation component
└── index.css          # Tailwind styles
```

### Composition Pattern

A **Composition** (in `Root.tsx`) defines a renderable video:
- `id`: identifier for CLI (e.g., `npx remotion render HelloWorld`)
- `component`: React component to render
- `durationInFrames`: total frames (default fps=30, so 300 frames = 10 seconds)
- `width` / `height`: resolution (default 1920×1080)
- `defaultProps`: initial props for the component

Each component receives frame number via `useCurrentFrame()` hook and animates values using `interpolate()` or `spring()`.

## Common Commands

```bash
# Development preview (live reload, adjust animations in real-time)
npm start
npm run dev

# Render final video to MP4
npm run build                    # Uses HelloWorld composition
npx remotion render HelloWorld   # Explicit composition ID

# Render a single frame as image
npx remotion still HelloWorld

# Run tests
npm run test
```

## Adding New Compositions

1. Create a new component file (e.g., `src/MyAnimation.tsx`):
   ```tsx
   import {useCurrentFrame, interpolate} from 'remotion';
   
   export const MyAnimation: React.FC = () => {
     const frame = useCurrentFrame();
     const opacity = interpolate(frame, [0, 30], [0, 1], {
       extrapolateLeft: 'clamp',
       extrapolateRight: 'clamp',
     });
     return <div style={{opacity}}>Hello</div>;
   };
   ```

2. Register it in `src/Root.tsx`:
   ```tsx
   <Composition
     id="MyAnimation"
     component={MyAnimation}
     durationInFrames={120}
     fps={30}
     width={1920}
     height={1080}
   />
   ```

## Critical APIs & Patterns

### Frame-based Animation
- `useCurrentFrame()` → current frame number (starts at 0)
- `interpolate(frame, [inputStart, inputEnd], [outputStart, outputEnd], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})` → smoothly animate values

### Layout & Layering
- `<AbsoluteFill>` → position elements absolutely, useful for layering
- `<Sequence from={10} durationInFrames={20}>` → show element only during frames 10-30
- `<Series>` → arrange elements sequentially without managing frame offsets

### Media
- `<Video src="...">` → from `@remotion/media`
- `<Audio src="...">` → from `@remotion/media`
- `<Img src="...">` → static images
- `<Gif src="...">` → from `@remotion/gif`
- Use `staticFile('filename')` for assets in `public/` folder

### Configuration
- `remotion.config.ts` → global settings (codec, frame rate, duration)
- `useVideoConfig()` → access {fps, durationInFrames, width, height} inside components
- `spring({fps, frame, config: {damping: 200}})` → spring animation helper

## Rendering & Deployment

- Local: `npm run build` outputs `out.mp4`
- AWS Lambda: `npx remotion lambda functions deploy` + `npx remotion lambda render HelloWorld`
- See https://www.remotion.dev/docs/lambda for cloud setup

## Tailwind Integration

Project includes Tailwind CSS. Use className directly in JSX:
```tsx
<div className="text-white text-2xl font-bold">Animated Text</div>
```

Configured in `tailwind.config.js` and `postcss.config.js`.
