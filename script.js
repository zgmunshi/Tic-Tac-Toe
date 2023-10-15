document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const cells = Array.from(document.querySelectorAll('.cell'));
    const winnerPopup = document.getElementById('winner-popup');
    const winnerMessage = document.getElementById('winner-message');
    const winnerName = document.getElementById('winner-name');
    const playAgainBtn = document.getElementById('play-again-btn');

    let currentPlayer = 'X';
    let boardState = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    // Winning combinations
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    // Function to check for a win
    function checkWin() {
        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
                return boardState[a];
            }
        }
        return null;
    }

    // Function to handle cell click
    function handleCellClick(e) {
        const cell = e.target;
        const index = cells.indexOf(cell);

        if (boardState[index] === '' && gameActive) {
            boardState[index] = currentPlayer;
            cell.textContent = currentPlayer;
            cell.classList.add(currentPlayer);
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

            const winner = checkWin();

            if (winner) {
                gameActive = false;
                showWinnerPopup(winner);
            } else if (!boardState.includes('')) {
                gameActive = false;
                showWinnerPopup('Draw');
            }
        }
    }

    // Function to show the winner popup
    function showWinnerPopup(winner) {
        winnerName.textContent = winner === 'Draw' ? 'It\'s a Draw!' : winner;
        winnerPopup.style.display = 'flex';
    }

    // Function to reset the game
    function resetGame() {
        currentPlayer = 'X';
        boardState = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;

        cells.forEach((cell) => {
            cell.textContent = '';
            cell.className = 'cell';
        });

        winnerPopup.style.display = 'none';
    }

    // Add event listeners to cells
    cells.forEach((cell) => {
        cell.addEventListener('click', handleCellClick);
    });

    // Add event listener to play again button
    playAgainBtn.addEventListener('click', resetGame);
});
