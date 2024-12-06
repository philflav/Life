# Game of Life Web Simulator

An interactive web-based implementation of Conway's Game of Life, featuring a comprehensive pattern library and real-time population tracking.

## Features

- Interactive grid-based cellular automaton
- 20 pre-defined classic Game of Life patterns including:
  - Glider
  - Blinker
  - Pulsar
  - Gosper Glider Gun
  - Acorn
  - R-pentomino
  - And many more!
- Real-time population tracking with Chart.js visualization
- Pattern library with detailed tooltips
- Start/Stop/Clear/Random generation controls

## Getting Started

1. Install Node.js if you haven't already
2. Install dependencies:
```bash
npm install
```
3. Start the server:
```bash
node server.js
```
4. Open your browser and navigate to `http://localhost:2095`

## How to Play

1. Click cells to toggle them between alive/dead states
2. Use the pattern library on the right to select pre-defined patterns
3. Click anywhere on the grid to place the selected pattern
4. Use the control buttons to:
   - Start/Stop the simulation
   - Clear the grid
   - Generate random cells
5. Watch the population graph to track the evolution of your patterns

## Game Rules

Conway's Game of Life follows these rules:
1. Any live cell with fewer than two live neighbors dies (underpopulation)
2. Any live cell with two or three live neighbors lives on to the next generation
3. Any live cell with more than three live neighbors dies (overpopulation)
4. Any dead cell with exactly three live neighbors becomes a live cell (reproduction)

## Technologies Used

- Frontend: Vanilla JavaScript, HTML5, CSS
- Visualization: Chart.js
- Backend: Node.js with Express
- Development: npm
