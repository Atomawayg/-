# Giving Directions — 3D English Learning Game

A 3D taxi-style English learning game built with React, Vite, TypeScript, Tailwind CSS, and React Three Fiber. Drive a car through a stylized city and follow spoken/written English directions ("Go straight for 2 blocks, turn right at the traffic light, and the hospital will be next to the library") to reach the correct destination.

## Gameplay

- Each round, an instruction panel describes a route to a randomly chosen building using intermediate-level English (landmarks, blocks, turns, prepositions).
- Drive the car to the destination described in the directions.
- Reach the **correct** building: **+100** points.
- Reach the **wrong** building: **−50** points.
- A new round starts automatically a couple of seconds after you arrive anywhere.
- A mini-map in the HUD shows your position, heading, and the target building (highlighted in amber).

## Controls

- **Desktop:** `W`/`A`/`S`/`D` or the arrow keys to drive (forward, turn left, reverse, turn right).
- **Mobile/touch:** an on-screen D-pad appears automatically on touch devices, in the bottom-right corner.
- Both input methods write to the same shared control state, so keyboard and touch never conflict.
- Click **"🔊 Play audio"** in the instruction panel to have the directions read aloud via the Web Speech API (the button is disabled automatically in browsers without speech synthesis support).

## Tech stack

- [Vite](https://vite.dev/) + [React 19](https://react.dev/) + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com/) (CSS-native `@theme` config, no JS config file)
- [Three.js](https://threejs.org/) via [`@react-three/fiber`](https://docs.pmnd.rs/react-three-fiber) and [`@react-three/drei`](https://github.com/pmndrs/drei)
- All 3D geometry is procedural (boxes/cylinders, pastel colors) — no external 3D model assets
- Self-hosted OFL-licensed font (`public/fonts/WorkSans-Bold.ttf`) for in-scene building labels, so the app has no runtime dependency on any external font CDN
- BFS pathfinding over a small intersection grid + template-based sentence generation for the English directions

## Local development

```bash
cd english-directions-game
npm install
npm run dev
```

Open the printed local URL in a browser.

Other scripts:

```bash
npm run build    # type-check (tsc -b) + production build to dist/
npm run preview  # serve the production build locally
npm run lint     # run ESLint
```

## Deploying to Vercel

1. Import this repository into Vercel.
2. Set the project's **Root Directory** to `english-directions-game`.
3. Framework Preset: Vite (auto-detected). Build command and output directory are auto-detected (`npm run build`, `dist`) — no overrides needed.
4. No environment variables and no `vercel.json` are required.
5. Deploy.

## Project structure

```
english-directions-game/
└── src/
    ├── components/
    │   ├── city/   City.tsx, Road.tsx, Building.tsx, TrafficLight.tsx, BuildingLabel.tsx
    │   ├── car/    Car.tsx, ChaseCamera.tsx
    │   ├── scene/  GameScene.tsx (Canvas, lights, ground, composes the city + car + camera)
    │   └── ui/     GameUI.tsx, InstructionPanel.tsx, ScoreBoard.tsx, MiniMap.tsx, TouchControls.tsx, RoundFeedback.tsx
    ├── context/    GameStateContext.tsx, gameReducer.ts, useGameState.ts
    ├── hooks/      useInputControls.ts, useSpeech.ts
    ├── lib/        grid.ts, cityLayout.ts, pathfinding.ts, directionGenerator.ts, sentenceTemplates.ts, collision.ts
    └── types/      game.ts
```
