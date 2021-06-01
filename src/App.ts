import { Board } from "./Board"
import { Scoreboard } from "./Scoreboard"

interface gameConfig {
    playerCoin: boolean,
    player1_Name?: String,
    player2_Name?: String,
    gameInProgress: boolean,
    totalGames: number
}
var defaultConfig: gameConfig = { 
    playerCoin: false, 
    player1_Name:"Tom",
    player2_Name:"Jerry",
    gameInProgress: false,
    totalGames: 0
 }

// Adaptors
const scoreboardBody: HTMLElement | any = document.getElementById("scoreboard_body")

const restartButton: HTMLElement | any = document.getElementById("restart")
const resetButton: HTMLElement | any = document.getElementById("reset")
const boardCells: HTMLElement | any = document.querySelectorAll(".grid-cell")

const scoreboard = new Scoreboard(scoreboardBody);
var board = new Board(true, false ,boardCells, scoreboard);

resetButton.addEventListener('click', () => {
    board.resetBoard(false)
    board = new Board(true, false ,boardCells, scoreboard);
    scoreboard.resetBoard();
})
restartButton.addEventListener('click', () => {
    board.resetBoard(false)
});
/*boardCells.forEach((cell:any) => {
    cell.addEventListener('click', (evt:Event) => {
    })
});*/