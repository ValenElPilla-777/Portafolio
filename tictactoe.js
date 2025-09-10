// tictactoe.js - Juego contra IA
document.addEventListener('DOMContentLoaded', function() {
    const board = document.getElementById('tic-tac-toe-board');
    const cells = document.querySelectorAll('.cell');
    const playerTurn = document.getElementById('player-turn');
    const gameStatus = document.getElementById('game-status');
    const resetButton = document.getElementById('reset-game');
    
    // Símbolos
    const HUMAN_PLAYER = 'X';
    const AI_PLAYER = 'O';
    
    let currentPlayer = HUMAN_PLAYER;
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;
    let isPlayerTurn = true;
    
    // Combinaciones ganadoras
    const winningConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Filas
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columnas
        [0, 4, 8], [2, 4, 6]             // Diagonales
    ];
    
    // Inicializar el juego
    function initGame() {
        cells.forEach(cell => {
            cell.addEventListener('click', handleCellClick);
            cell.textContent = '';
            cell.classList.remove('x', 'o', 'win');
        });
        
        resetButton.addEventListener('click', resetGame);
        
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        isPlayerTurn = true;
        currentPlayer = HUMAN_PLAYER;
        playerTurn.textContent = 'Turno: X (Tú)';
        gameStatus.textContent = '';
    }
    
    // Manejar clic en celda (solo para jugador humano)
    function handleCellClick(e) {
        if (!isPlayerTurn || !gameActive) return;
        
        const cell = e.target;
        const cellIndex = parseInt(cell.getAttribute('data-cell-index'));
        
        // Verificar si la celda ya está ocupada
        if (gameBoard[cellIndex] !== '') {
            return;
        }
        
        // Realizar movimiento del jugador
        makeMove(cellIndex, HUMAN_PLAYER);
        
        // Verificar resultado después del movimiento del jugador
        if (checkWinner(gameBoard) === HUMAN_PLAYER) {
            endGame(`¡Ganaste!`);
            highlightWinningCells();
            return;
        }
        
        if (isBoardFull()) {
            endGame('¡Empate!');
            return;
        }
        
        // Cambiar a turno de la IA
        isPlayerTurn = false;
        playerTurn.textContent = 'Turno: O (IA)';
        
        // La IA hace su movimiento después de un breve retraso
        setTimeout(makeAIMove, 600);
    }
    
    // Realizar movimiento en el tablero
    function makeMove(index, player) {
        gameBoard[index] = player;
        cells[index].textContent = player;
        cells[index].classList.add(player.toLowerCase());
    }
    
    // Movimiento de la IA usando el algoritmo Minimax
    function makeAIMove() {
        if (!gameActive) return;
        
        // Encontrar el mejor movimiento usando Minimax
        const bestMove = findBestMove();
        
        // Realizar el movimiento de la IA
        makeMove(bestMove, AI_PLAYER);
        
        // Verificar resultado después del movimiento de la IA
        if (checkWinner(gameBoard) === AI_PLAYER) {
            endGame('¡La IA gana!');
            highlightWinningCells();
            return;
        }
        
        if (isBoardFull()) {
            endGame('¡Empate!');
            return;
        }
        
        // Volver al turno del jugador
        isPlayerTurn = true;
        playerTurn.textContent = 'Turno: X (Tú)';
    }
    
    // Algoritmo Minimax para encontrar el mejor movimiento
    function findBestMove() {
        let bestScore = -Infinity;
        let bestMove = -1;
        
        // Probar todos los movimientos posibles
        for (let i = 0; i < 9; i++) {
            if (gameBoard[i] === '') {
                gameBoard[i] = AI_PLAYER;
                let score = minimax(gameBoard, 0, false);
                gameBoard[i] = '';
                
                if (score > bestScore) {
                    bestScore = score;
                    bestMove = i;
                }
            }
        }
        
        return bestMove;
    }
    
    // Algoritmo Minimax recursivo
    function minimax(board, depth, isMaximizing) {
        // Verificar estado del juego
        const result = checkWinner(board);
        
        if (result === AI_PLAYER) return 10 - depth;
        if (result === HUMAN_PLAYER) return depth - 10;
        if (isBoardFullCustom(board)) return 0;
        
        if (isMaximizing) {
            let bestScore = -Infinity;
            
            for (let i = 0; i < 9; i++) {
                if (board[i] === '') {
                    board[i] = AI_PLAYER;
                    let score = minimax(board, depth + 1, false);
                    board[i] = '';
                    bestScore = Math.max(score, bestScore);
                }
            }
            
            return bestScore;
        } else {
            let bestScore = Infinity;
            
            for (let i = 0; i < 9; i++) {
                if (board[i] === '') {
                    board[i] = HUMAN_PLAYER;
                    let score = minimax(board, depth + 1, true);
                    board[i] = '';
                    bestScore = Math.min(score, bestScore);
                }
            }
            
            return bestScore;
        }
    }
    
    // Verificar si hay un ganador
    function checkWinner(board) {
        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }
        return null;
    }
    
    // Verificar si el tablero está lleno
    function isBoardFull() {
        return !gameBoard.includes('');
    }
    
    // Verificar si el tablero está lleno (para tableros personalizados)
    function isBoardFullCustom(board) {
        return !board.includes('');
    }
    
    // Resaltar celdas ganadoras
    function highlightWinningCells() {
        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                cells[a].classList.add('win');
                cells[b].classList.add('win');
                cells[c].classList.add('win');
                break;
            }
        }
    }
    
    // Finalizar el juego
    function endGame(message) {
        gameActive = false;
        gameStatus.textContent = message;
        playerTurn.textContent = 'Juego terminado';
    }
    
    // Reiniciar juego
    function resetGame() {
        initGame();
    }
    
    // Iniciar el juego cuando se carga la página
    initGame();
});