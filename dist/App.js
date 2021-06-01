define("Scoreboard", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.Scoreboard = void 0;
    var Scoreboard = (function () {
        function Scoreboard(boardBody) {
            this.boardBody = boardBody;
            this.id = 0;
        }
        Scoreboard.prototype.highlightBestGame = function () { };
        Scoreboard.prototype.gameMetrics = function () { };
        Scoreboard.prototype.addGameInfo = function (playerName, gameTime) {
            var newRow = document.createElement("tr");
            var idCell = document.createElement("td");
            idCell.innerHTML = String(this.id);
            newRow.append(idCell);
            var winnerCell = document.createElement("td");
            winnerCell.innerHTML = playerName;
            newRow.append(winnerCell);
            var timeCell = document.createElement("td");
            timeCell.innerHTML = String(gameTime);
            newRow.append(timeCell);
            this.boardBody.appendChild(newRow);
            this.id = this.id + 1;
        };
        Scoreboard.prototype.resetBoard = function () {
            this.boardBody.innerHTML = "";
            this.id = 0;
        };
        return Scoreboard;
    }());
    exports.Scoreboard = Scoreboard;
});
define("Board", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.Board = void 0;
    var coin = ["X", "O"];
    var gridMap = { 0: [0, 0], 1: [0, 1], 2: [0, 2], 3: [1, 0], 4: [1, 1], 5: [1, 2], 6: [2, 0], 7: [2, 1], 8: [2, 2] };
    var Board = (function () {
        function Board(firstMove, _CPU, boardCells, scoreboard) {
            var _this = this;
            this.CPU = false;
            this.grid = [[-1, -1, -1], [-1, -1, -1], [-1, -1, -1]];
            this.curMove = 0;
            this.moves = 0;
            this.CPU = _CPU;
            this.boardCells = boardCells;
            this.scoreboard = scoreboard;
            this.boardCells.forEach(function (cell) {
                cell.addEventListener('click', function (evt) {
                    var gridCell = evt.target;
                    var gridIdx = Number(evt.target["id"][4]);
                    if (gridCell.innerHTML == "")
                        _this.playMove(gridIdx, gridCell);
                });
            });
        }
        Board.prototype.checkBoard = function (currMove, gridIdx) {
            var check = true;
            for (var i = 0; i < this.grid.length; i++) {
                check = check && (this.grid[gridMap[gridIdx][0]][i] == currMove);
            }
            if (check)
                return true;
            check = true;
            for (var i = 0; i < this.grid.length; i++) {
                check = check && (this.grid[i][gridMap[gridIdx][1]] == currMove);
            }
            if (check)
                return true;
            check = true;
            for (var i = 0; i < this.grid.length; i++) {
                check = check && (this.grid[i][i] == currMove);
            }
            if (check)
                return true;
            check = true;
            for (var i = 0, k = 2; i < this.grid.length; k--, i++) {
                check = check && (this.grid[i][k] == currMove);
            }
            if (check)
                return true;
            return false;
        };
        Board.prototype.resetBoard = function (gameStatus) {
            this.moves = 0;
            this.grid = [[-1, -1, -1], [-1, -1, -1], [-1, -1, -1]];
            if (gameStatus) {
                this.declareWinner();
            }
            this.boardCells.forEach(function (cell) {
                cell.innerHTML = "";
            });
            if (gameStatus) {
                var tmpDate = new Date;
                this.scoreboard.addGameInfo(this.curMove == 0 ? "player1" : "player2", (tmpDate.getTime() - this.gameStart.getTime()) / 1000);
            }
            this.curMove = 0;
            this.gameStart = null;
        };
        Board.prototype.playMove = function (gridIdx, gridCell) {
            if (this.moves == 0)
                this.gameStart = new Date();
            if (this.curMove == 0) {
                gridCell.innerHTML = coin[this.curMove];
                this.grid[gridMap[gridIdx][0]][gridMap[gridIdx][1]] = 1;
            }
            else {
                gridCell.innerHTML = coin[this.curMove];
                this.grid[gridMap[gridIdx][0]][gridMap[gridIdx][1]] = 2;
            }
            var status = this.checkBoard(this.curMove == 0 ? 1 : 2, gridIdx);
            if (this.moves == 8) {
                var tmpDate = new Date;
                this.scoreboard.addGameInfo("DRAW", (tmpDate.getTime() - this.gameStart.getTime()) / 1000);
                this.resetBoard(status);
            }
            if (status) {
                this.resetBoard(status);
                return;
            }
            this.moves += 1;
            this.curMove = this.curMove + 1;
            this.curMove = this.curMove % 2;
        };
        Board.prototype.declareWinner = function () {
            var winnerMsg = "Congrats! ";
            winnerMsg += (this.curMove == 0) ? "player1" : "player2";
            window.alert(winnerMsg);
        };
        return Board;
    }());
    exports.Board = Board;
});
define("App", ["require", "exports", "Board", "Scoreboard"], function (require, exports, Board_1, Scoreboard_1) {
    "use strict";
    exports.__esModule = true;
    var defaultConfig = {
        playerCoin: false,
        player1_Name: "Tom",
        player2_Name: "Jerry",
        gameInProgress: false,
        totalGames: 0
    };
    var scoreboardBody = document.getElementById("scoreboard_body");
    var restartButton = document.getElementById("restart");
    var resetButton = document.getElementById("reset");
    var boardCells = document.querySelectorAll(".grid-cell");
    var scoreboard = new Scoreboard_1.Scoreboard(scoreboardBody);
    var board = new Board_1.Board(true, false, boardCells, scoreboard);
    resetButton.addEventListener('click', function () {
        board.resetBoard(false);
        board = new Board_1.Board(true, false, boardCells, scoreboard);
        scoreboard.resetBoard();
    });
    restartButton.addEventListener('click', function () {
        board.resetBoard(false);
    });
});
