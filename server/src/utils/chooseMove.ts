import { Board, Challenge } from '../types';
import chooseBestMove from './minimaxMove';
import chooseRandomMove from './randomMove';

export default function chooseMove(
    board: Board,
    challenge?: Challenge,
): number {
    if (challenge && challenge === 'impossible') {
        return chooseBestMove(board);
    }

    return chooseRandomMove(board);
}
