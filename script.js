let currentPlayer = 'cross';
let board = ['', '', '', '', '', '', '', '', ''];

const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const overlay = document.getElementById('overlay');
const resultMessage = document.getElementById('result');
const player1Input = document.getElementById('player1');
const player2Input = document.getElementById('player2');

function drawX(cell) {
    const xElement = document.createElement('div');
    xElement.className = 'cross';
    cells[cell].appendChild(xElement);
}

function drawO(cell) {
    const oElement = document.createElement('div');
    oElement.className = 'circle';
    cells[cell].appendChild(oElement);
}

function handleMove(cell) {
    if (board[cell] === '' && !checkWinner()) {
        board[cell] = currentPlayer;
        if (currentPlayer === 'cross') {
            drawX(cell);
        } else {
            drawO(cell);
        }
        if (checkWinner()) {
            showOverlay(`${getPlayerName(currentPlayer)} 胜利！`);
        } else if (!board.includes('')) {
            showOverlay('平局！');
        } else {
            currentPlayer = currentPlayer === 'cross' ? 'circle' : 'cross';
            message.innerText = `${getPlayerName(currentPlayer)} 的回合`;
        }
    }
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return true;
        }
    }

    return false;
}

function showOverlay(result) {
    resultMessage.innerText = result;
    overlay.style.display = 'flex';
}

function restartGame() {
    currentPlayer = 'cross';
    board = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => {
        cell.innerText = '';
        while (cell.firstChild) {
            cell.firstChild.remove();
        }
    });
    overlay.style.display = 'none';
    const player1Name = player1Input.value || '玩家1';
    const player2Name = player2Input.value || '玩家2';
    message.innerText = `${player1Name} 的回合`;
}

function getPlayerName(player) {
    return player === 'cross' ? player1Input.value || '玩家1' : player2Input.value || '玩家2';
}

// 添加触摸事件处理程序
cells.forEach((cell, index) => {
    cell.addEventListener('click', () => handleMove(index));
    cell.addEventListener('touchstart', () => handleMove(index));
});

restartGame();
