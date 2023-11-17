import { Board } from '../types';
import { checkWinner, isDraw } from './game';

function minimax(board: Board, depth: number, maximizingPlayer: boolean) {
    const winner = checkWinner(board);

    // Heuristic: if the winner is the IA, it returns a high score based on
    // the depth of the move in the game tree. Otherwise, the score
    // will be negative.
    if (winner) {
        return winner === 'O' ? 10 - depth : depth - 10;
    }

    if (isDraw(board)) {
        return 0;
    }

    // IA.
    if (maximizingPlayer) {
        let bestScore = -Infinity;

        for (let i = 0; i < board.length; i++) {
            if (board[i] === null) {
                board[i] = 'O';
                let score = minimax(board, depth + 1, false);
                board[i] = null;

                bestScore = Math.max(bestScore, score);
            }
        }
        return bestScore;
    }

    // Human.
    else {
        let bestScore = Infinity;

        for (let i = 0; i < board.length; i++) {
            if (board[i] === null) {
                board[i] = 'X';
                let score = minimax(board, depth + 1, true);
                board[i] = null;

                bestScore = Math.min(bestScore, score);
            }
        }
        return bestScore;
    }
}

export default function chooseBestMove(board: Board) {
    let bestMove = -1;
    let bestScore = -Infinity;

    for (let i = 0; i < board.length; i++) {
        if (board[i] === null) {
            board[i] = 'O';
            let score = minimax(board, 0, false);
            board[i] = null;

            if (score > bestScore) {
                bestScore = score;
                bestMove = i;
            }
        }
    }
    return bestMove;
}
