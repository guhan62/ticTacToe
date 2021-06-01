import { map } from "./Dict";
import { Scoreboard } from "./Scoreboard";

/*
    - Running Instance to monitor Game & Player
    - sessionObject created to track & update Winner
    - Leadership b
*/
const coin: Array<String> = ["X", "O"]
const gridMap: map = { 0:[0,0], 1:[0,1], 2:[0,2], 3:[1,0], 4:[1,1], 5:[1,2], 6:[2,0], 7:[2,1], 8:[2,2] }

class Board {
    // Cells: 0 - Empty, 1 - 'X', 2 - 'O'
    grid:number[][];
    boardCells!: HTMLElement[];
    curMove: number
    gameStart!: Date
    moves: number
    scoreboard: Scoreboard
    CPU:boolean = false;
    constructor(firstMove: boolean, _CPU:boolean, boardCells:HTMLElement[], scoreboard: Scoreboard) {
        this.grid = [[-1,-1,-1], [-1,-1,-1], [-1,-1,-1]]
        this.curMove = 0
        this.moves = 0
        this.CPU = _CPU
        this.boardCells = boardCells
        this.scoreboard = scoreboard
        this.boardCells.forEach((cell:any) => {
            cell.addEventListener('click', (evt:Event) => {
                const gridCell: HTMLElement | any = evt.target
                const gridIdx:number = Number(evt.target["id"][4])
                if(gridCell.innerHTML == "")
                    this.playMove(gridIdx, gridCell)
            })
        });
    }

    private checkBoard(currMove: number, gridIdx:number): boolean {
        var check: boolean = true
        // Check ROW
        for (let i = 0; i < this.grid.length; i++) {
            check = check && (this.grid[gridMap[gridIdx][0]][i]==currMove)
        }
        if(check)   return true
        check = true
        // Check Column
        for (let i = 0; i < this.grid.length; i++) {
            check = check && (this.grid[i][gridMap[gridIdx][1]]==currMove)
        }
        if(check)   return true
        check = true
        // Check Left Diagonal
        for (let i = 0; i < this.grid.length; i++) {
            check = check && (this.grid[i][i]==currMove)
        }
        if(check)   return true
        check = true
        // Check Right Diagonal
        for (let i = 0, k = 2; i < this.grid.length; k--,i++) {
            check = check && (this.grid[i][k]==currMove)
        }
        if(check)   return true
        return false
    }

    public resetBoard(gameStatus : boolean) {
        this.moves = 0
        this.grid = [[-1,-1,-1], [-1,-1,-1], [-1,-1,-1]]
        if(gameStatus)  {
            this.declareWinner()
        }
        this.boardCells.forEach((cell:any) => {
            cell.innerHTML = ""
        })
        if(gameStatus)  {
            let tmpDate:Date = new Date
            this.scoreboard.addGameInfo(this.curMove==0?"player1":"player2", (tmpDate.getTime() - this.gameStart.getTime())/1000)
        }
        this.curMove = 0
        this.gameStart = null
    }

    private playMove(gridIdx: number, gridCell: HTMLElement | any) {
        if(this.moves == 0)
            this.gameStart = new Date()
        // Player1 :: Move
        if(this.curMove == 0) {
            gridCell.innerHTML = coin[this.curMove]
            this.grid[gridMap[gridIdx][0]][gridMap[gridIdx][1]] = 1
        }
        else {
            gridCell.innerHTML = coin[this.curMove]
            this.grid[gridMap[gridIdx][0]][gridMap[gridIdx][1]] = 2
        } 
        let status:boolean = this.checkBoard(this.curMove==0? 1 : 2, gridIdx)

        //console.log(status, this.grid, this.moves)
        if(this.moves == 8) {
            let tmpDate:Date = new Date
            this.scoreboard.addGameInfo("DRAW", (tmpDate.getTime() - this.gameStart.getTime())/1000)
            this.resetBoard(status)
        }
        if(status) {
            this.resetBoard(status)
            return
        }
        this.moves += 1
        this.curMove = this.curMove+1
        this.curMove = this.curMove%2
    }

    private declareWinner() {
        let winnerMsg:String = "Congrats! "
        winnerMsg += (this.curMove==0)?"player1":"player2"
        window.alert(winnerMsg)
    }
}
export {Board};