
let board;
let turn;
let winner;
let tie;


const squareEls = document.querySelectorAll('.cell');
const messageEl = document.getElementById('message');

init();

function init() {
    console.log(game initialized);
    board = [
        '', '', '',
        '', '', '',
        '', '', ''
    ];
    turn = 'X';
    winner = null;
    tie = false;
   render();
}

function render() {
    updateBoard();
    updateMessage();
}

function updateBoard() {
    board.forEach((cell, index) => {
        squareEls[index].textContent = cell;
    });
}

function updateMessage() {
    if (winner) {
        messageEl.textContent = `${winner} wins!`;
    } else if (tie) {
        messageEl.textContent = "It's a tie!";
    } else {
        messageEl.textContent = `Turn: ${turn}`;
    }
}

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleClick(evt) {
    const squareEls = evt.target.id;
    if (board[squareEls] || winner) return;

    placePiece(squareEls);
    checkForTie();
    checkForWinner();
    switchTurn();
    render();
}
squareEls.forEach(squareEl => {
    squareEl.addEventListener('click', handleClick);
});

function placePiece(index) {
    board[index] = turn;
}

function checkForWinner() {
    for (let combo of winningCombos) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            winner = board[a];
            return;
        }
    }
}

function checkForTie() {
    if (board.every(cell => cell) && !winner) {
        tie = true;
    }
}

function switchTurn() {
    if (!winner && !tie) {
        turn = turn === 'X' ? 'O' : 'X';
    }
}

function resetGame() {
    init();
}

const resetButton = document.getElementById('reset-button');
resetButton.addEventListener('click', resetGame);