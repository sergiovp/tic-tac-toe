import { useEffect, useState } from 'react';
import { useGameAPI } from './useGameAPI';
import wait from '../utils/wait';
import { checkWinner } from '../utils/checkWinner';

export const useBoard = () => {
    const [boardData, setBoardData] = useState<BoardElement[]>(
        Array(9).fill(null),
    );
    const [turn, setTurn] = useState<TurnElement>('X');
    const [rank, setRank] = useState<Rank>({
        victories: 0,
        defeats: 0,
        draws: 0,
    });
    const [winner, setWinner] = useState<Winner>(null);
    const [gameDifficulty, setGameDifficulty] =
        useState<GameDifficulty>('easy');
    const [loading, setLoading] = useState<boolean>(false);

    const { fetchUpdateRank, fetchWinner, fetchGetRank, fetchGetMove } =
        useGameAPI(boardData, winner, gameDifficulty);

    const onDifficultyChange = (diffilcuty: GameDifficulty) => {
        setGameDifficulty(diffilcuty);
    };

    const updateBoard = (index: number) => {
        if (boardData[index]) {
            return;
        }

        const newBoard = [...boardData];
        newBoard[index] = turn;
        setBoardData(newBoard);
        setTurn(turn === 'X' ? 'O' : 'X');
    };

    const resetBoard = () => {
        setBoardData(Array(9).fill(null));
    };

    const resetTurn = () => {
        setTurn('X');
    };

    const getWinner = async () => {
        const winner = await fetchWinner();
        setWinner(winner);
    };

    const getRank = async () => {
        const rank = await fetchGetRank();
        setRank(rank);
    };

    const updateRank = async () => {
        const rank = await fetchUpdateRank();
        setRank(rank);
    };

    const getMove = async () => {
        setLoading(true);
        const move = await fetchGetMove();
        await wait(1000);
        updateBoard(move);
        setLoading(false);
    };

    useEffect(() => {
        getWinner();
    }, [turn]);

    useEffect(() => {
        getRank();
    }, []);

    useEffect(() => {
        if (!winner) {
            return;
        }
        updateRank();
    }, [winner]);

    useEffect(() => {
        if (turn === 'X' || checkWinner(boardData)) {
            return;
        }

        getMove();
    }, [boardData]);

    return {
        boardData,
        updateBoard,
        turn,
        resetBoard,
        fetchGetRank,
        rank,
        winner,
        setWinner,
        onDifficultyChange,
        gameDifficulty,
        loading,
        resetTurn,
    };
};
