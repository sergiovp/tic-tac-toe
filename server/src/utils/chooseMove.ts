import { Board, Challenge } from '../types';
import chooseRandomMove from './randomMove';

export default function chooseMove(
    board: Board,
    _challenge?: Challenge,
): number {
    return chooseRandomMove(board);
}
