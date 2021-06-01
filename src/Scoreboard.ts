class Scoreboard {
    private boardBody: HTMLElement | any
    private id: number
    constructor(boardBody: HTMLElement | any) {
        this.boardBody = boardBody
        this.id = 0
    }
    private highlightBestGame() {}
    private gameMetrics() {}
    public addGameInfo(playerName: string, gameTime: number) : void {
        let newRow = document.createElement("tr");
        let idCell = document.createElement("td");
        idCell.innerHTML = String(this.id);
        newRow.append(idCell)
        let winnerCell = document.createElement("td");
        winnerCell.innerHTML = playerName;
        newRow.append(winnerCell)
        let timeCell = document.createElement("td");
        timeCell.innerHTML = String(gameTime);
        newRow.append(timeCell)
        this.boardBody.appendChild(newRow)
        this.id = this.id + 1
    }
    public resetBoard() : void {
        this.boardBody.innerHTML = "";
        this.id = 0
    }
}

export {Scoreboard};