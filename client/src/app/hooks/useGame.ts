import { useEffect, useState } from 'react';
import wait from '../utils/wait';
import { useRank } from './useRank';
import { useWinner } from './useWinner';
import { API_URL } from '../constants';

export const useGame = () => {
    const initialBoardData = Array(9).fill(null);

    const [boardData, setBoardData] = useState<Board>(initialBoardData);
    const [turn, setTurn] = useState<TurnElement>('X');
    const [gameDifficulty, setGameDifficulty] =
        useState<GameDifficulty>('easy');
    const [loading, setLoading] = useState<boolean>(false);

    const { rank, updateRank } = useRank();
    const { winner, getWinner, resetWinner } = useWinner();

    const getMove = async () => {
        try {
            changeLoading(true);

            const res = await fetch(`${API_URL}/game/move`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    board: boardData,
                    challenge: gameDifficulty,
                }),
            });

            const data = await res.json();
            const nextMove = data.nextMove;

            // If the next move is invalid, do not do anything.
            if (nextMove === -1) {
                return;
            }

            // Wait 1s to simulate that the AI is thinking.
            await wait(500);

            updateBoard(nextMove);
            changeLoading(false);
        } catch (error) {
            console.error('Error getting move:', error);
        }
    };

    const changeDifficulty = (difficulty: GameDifficulty) => {
        setGameDifficulty(difficulty);
    };

    const changeTurn = (turn: TurnElement) => {
        setTurn(turn);
    };

    const changeLoading = (isLoading: boolean) => {
        setLoading(isLoading);
    };

    const resetTurn = () => {
        setTurn('X');
    };

    const updateBoard = (index: number) => {
        if (boardData[index]) {
            return;
        }

        const newBoard = [...boardData];
        newBoard[index] = turn;
        setBoardData(newBoard);
        changeTurn(turn === 'X' ? 'O' : 'X');
    };

    //Each time the turn changes, we check if there is a winner.
    useEffect(() => {
        getWinner(boardData);
    }, [turn]);

    // Update the rank each time there is a winner.
    useEffect(() => {
        if (winner) {
            updateRank(winner);
        }
    }, [winner]);

    // Get next move when it is the IA's turn.
    useEffect(() => {
        if (turn === 'X') {
            return;
        }
        getMove();
    }, [boardData, turn]);

    const resetGame = () => {
        setBoardData(initialBoardData);
        changeLoading(false);
        resetWinner();
        resetTurn();
    };

    return {
        boardData,
        updateBoard,
        rank,
        winner,
        loading,
        resetTurn,
        resetGame,
        turn,
        changeDifficulty,
        gameDifficulty,
    };
};
