const cells = [...document.getElementsByClassName("gameCell")];
var gameOver = false;
const Board = () => {
    const winner = () => {
        /* This is my AI-generated function, as tasked by the assignment. I gave CoPilot a very simple prompt: "Create a function to check the rows, columns, and diagonals for a winner in tic tac toe."*/
        /* This initial prompt generated everything in the "winner" function, including the comments. CoPilot is great, actually, I should use this more often. */

        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
            [0, 4, 8], [2, 4, 6]             // diagonals
        ];

        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            /* Note: I had to tell CoPilot to make this if statement account for if the cells are blank after I generated it. */
            if (cells[a].innerHTML !== "" && cells[a].innerHTML === cells[b].innerHTML && cells[a].innerHTML === cells[c].innerHTML) {
                return cells[a].innerHTML; // return the winner ('X' or 'O')
            }
        }
        return null; // no winner
    }
    const play = (cell, player) => {
        if(document.getElementById(cell).innerHTML === "" && !gameOver) {
            document.getElementById(cell).innerHTML = player;
            return true;
        }
        return false;
    }
    const clear = () => {
        cells.forEach(cell => {
            cell.innerHTML = "";
        });
    }
    const isBoardFull = () => {
        return cells.every(cell => cell.innerHTML !== "");
    }
    return { winner, play, clear, isBoardFull };
}

const Player = (name, symbol) => {
    return { name, symbol };
}

const Game = (player1, player2, board) => {
    const players = [player1, player2];
    let currentPlayer = Math.floor(Math.random() * 2);
    const currentPlayerText = document.getElementById("currentPlayerMessage");
    const activeTextChange = () => {
        currentPlayerText.textContent = players[currentPlayer].name + "'s turn!";
    }
    activeTextChange();
    const resetButton = document.getElementById("reset");
    const switchPlayer = () => {
        currentPlayer += 1;
        currentPlayer %= 2;
        activeTextChange();
    }
    cells.forEach((cell) => {
        cell.addEventListener("click", (event) => {
            if (board.play(event.target.id, players[currentPlayer].symbol)) {
                if (board.winner() === "X") {
                    alert("X wins!");
                    gameOver = true;
                    currentPlayerText.textContent = "X wins!";
                }
                else if (board.winner() === "O") {
                    alert("O wins!");
                    gameOver = true;
                    currentPlayerText.textContent = "O wins!";
                }
                else if (board.isBoardFull()) {
                    alert("Draw!");
                    gameOver = true;
                    currentPlayerText.textContent = "Draw!";
                }
                else {
                    switchPlayer();
                }
            };
        });
    });
    const reset = () => {
        gameOver = false;
        board.clear();
        currentPlayer = Math.floor(Math.random() * 2);
        activeTextChange();
    }
    resetButton.addEventListener("click", reset);
}

const TicTacToe = (()=> {
    const player1 = Player("Player 1","X");
    const player2 = Player("Player 2","O");
    const board = Board();
    const game = Game(player1, player2, board);
})();