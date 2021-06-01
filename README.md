# TicTacToe
Designing ticTacToe with TypeScript -- [playground URL](https://guhan62.github.io/ticTacToe/)

## Module Layout
* class `Board` [src/Board.ts]
Tracks the Board movements, & Checks for Winner

* Class `Scoreboard` [src/Scoreboard.ts]
Updates Leaderboard based on Game Results

* main() [src/App.ts]
Controller Facade - Setting Events for buttons, Creating instances

* run.js [./run.js]
**Start Server** - `tsc && node run.js`
Uses `fs` package to serve static file content via Node  
`tsc` typeScript compiler, installed via npm `npm install -d typescript`


## Requirements
* [NodeJS](https://nodejs.org/en/)
* [RequireJS](https://requirejs.org/)
* [typeScript](https://www.typescriptlang.org/)
* [milligram.css](https://milligram.io/)

## References
* [typeScript Guide](https://www.typescriptlang.org/docs/handbook/intro.html)