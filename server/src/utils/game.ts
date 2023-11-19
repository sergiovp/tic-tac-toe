import { Board, Winner } from '../types';

export function checkWinner(board: Board): Winner {
    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let condition of winConditions) {
        const [a, b, c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }

    return null;
}

export function isDraw(board: Board) {
    return board.every((square) => square !== null);
}

export function determineWinner(board: Board) {
    let winner = checkWinner(board);

    if (!winner) {
        const isDrawGame = isDraw(board);
        winner = isDrawGame ? 'draw' : null;
    }

    return winner;
}
