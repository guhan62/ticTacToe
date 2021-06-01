declare module "Scoreboard" {
    class Scoreboard {
        private boardBody;
        private id;
        constructor(boardBody: HTMLElement | any);
        private highlightBestGame;
        private gameMetrics;
        addGameInfo(playerName: string, gameTime: number): void;
        resetBoard(): void;
    }
    export { Scoreboard };
}
declare module "Board" {
    import { Scoreboard } from "Scoreboard";
    class Board {
        grid: number[][];
        boardCells: HTMLElement[];
        curMove: number;
        gameStart: Date;
        moves: number;
        scoreboard: Scoreboard;
        CPU: boolean;
        constructor(firstMove: boolean, _CPU: boolean, boardCells: HTMLElement[], scoreboard: Scoreboard);
        private checkBoard;
        resetBoard(gameStatus: boolean): void;
        private playMove;
        private declareWinner;
    }
    export { Board };
}
declare module "App" { }
