import { Board } from '../types';

export default function chooseRandomMove(board: Board): number {
    const nullIndexes = board
        .map((element, index) => (element === null ? index : null))
        .filter((index) => index !== null);
    return nullIndexes[
        Math.floor(Math.random() * nullIndexes.length)
    ] as number;
}
