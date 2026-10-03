# Memory Game 🎲

A memory matching game: the player flips cards and memorizes their positions to find all pairs in as few moves as possible.

Built as part of the [Rolling Scopes School](https://rs.school/) fullstack
engineering course. The task description is available here:
[Memory game](https://github.com/rolling-scopes-school/tasks/blob/master/tasks/memory-game/README.md).

## How to play

- The board has 16 cards (8 pairs) shuffled on every game start.
- Click a card to flip it. Open two cards per move:
  - a matching pair stays open;
  - a mismatching pair closes after a short delay.
- While a pair is being checked, clicks on other cards are ignored.
- The game ends when all 8 pairs are found.

## Features

- Shuffled board using the Fisher–Yates algorithm.
- Move and pair counters (0–8).
- Win modal with the final move count.
- Leaderboard: top 10 results, saved between sessions.
- "New game" resets the board without a page reload.

## Tech stack

- Vanilla JavaScript, no UI frameworks.
- [Vite](https://vite.dev/) — dev server and build.
- CSS modules.
- ESLint, Stylelint, Prettier, Husky, lint-staged.

All markup is created in JavaScript via `BaseComponent` class.

## Local setup

```bash
git clone https://github.com/abeilleee/memory-game.git
cd memory-game
npm install
npm run dev
```

Vite opens the dev server in the browser automatically. The default address is `http://localhost:5173`.

## Build

```bash
npm run build
npm run preview
```

The production build goes to `dist/`; `npm run preview` serves it locally.

## Scripts

| Script               | Purpose                      |
| -------------------- | ---------------------------- |
| `npm run dev`        | Start the dev server         |
| `npm run build`      | Production build to `dist/`  |
| `npm run preview`    | Preview the production build |
| `npm run lint`       | Lint JavaScript with ESLint  |
| `npm run stylelint`  | Lint CSS with Stylelint      |
| `npm run format:fix` | Format with Prettier         |

## Project structure

```
src/
├── App.js                  # root class: builds the layout and wires components
├── main.js                 # entry point
├── constants.js            # constants
├── utils/
│   └── shuffle.js          # Fisher–Yates shuffle
├── services/
│   └── Storage.js          # read/write results in localStorage
├── styles/                 # global styles and tokens
└── components/
    ├── BaseComponent/      # wrapper around document.createElement
    ├── Header/  Footer/
    ├── GameField/          # game logic: cards, moves, pairs
    ├── Card/  Counter/
    ├── Modal/              # shared modal component
    ├── WinContent/         # win modal content
    └── Leaderboard/        # leaderboard table
```

## Result storage

Results are stored in `localStorage` under the key `abeillee-memory-game` as an array of `{ date, steps }` objects.
