import { Board, Challenge } from '../types';
import { determineWinner } from './game';
import chooseBestMove from './minimaxMove';
import chooseRandomMove from './randomMove';

export default function chooseMove(
    board: Board,
    challenge?: Challenge,
): number {
    // When there is a winner or it is a draw, don't return a valid move.
    if (determineWinner(board)) {
        return -1;
    }

    if (challenge && challenge === 'impossible') {
        return chooseBestMove(board);
    }

    return chooseRandomMove(board);
}
