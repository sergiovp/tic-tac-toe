type TurnElement = 'X' | 'O';

type BoardElement = TurnElement | null;

type Board = BoardElement[];

type Winner = 'O' | 'X' | 'draw' | null;

type GameDifficulty = 'easy' | 'impossible';

type Rank = {
    victories: number;
    defeats: number;
    draws: number;
};
