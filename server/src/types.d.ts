export type Winner = 'X' | 'O' | 'draw' | null;

type BoardElement = 'X' | 'O' | null;

export type Board = BoardElement[];

export type Challenge = 'easy' | 'impossible';

export type Result = 'victories' | 'defeats' | 'draws';
