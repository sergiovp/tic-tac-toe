import { useState } from 'react';
import { API_URL } from '../constants';

export const useWinner = () => {
    const [winner, setWinner] = useState<Winner>(null);

    const getWinner = async (boardData: Board) => {
        try {
            const res = await fetch(`${API_URL}/game/winner`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    board: boardData,
                }),
            });
            const data = await res.json();
            const winner = data.winner;
            setWinner(winner);
        } catch (error) {
            console.error('Error getting winner:', error);
        }
    };

    const resetWinner = () => setWinner(null);

    return {
        winner,
        getWinner,
        resetWinner,
    };
};
