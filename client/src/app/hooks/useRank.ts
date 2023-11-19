import { useEffect, useState } from 'react';
import { API_URL } from '../constants';

export const useRank = () => {
    const initialRank = {
        victories: 0,
        defeats: 0,
        draws: 0,
    };
    const [rank, setRank] = useState<Rank>(initialRank);

    const getRank = async () => {
        try {
            const res = await fetch(`${API_URL}/game/rank`);
            const rank = await res.json();
            setRank(rank.results);
        } catch (error) {
            console.error('Error getting rank:', error);
        }
    };

    const updateRank = async (winner: Winner) => {
        const result =
            winner === 'X' ? 'victories' : winner === 'O' ? 'defeats' : 'draws';
        try {
            const res = await fetch(`${API_URL}/game/rank`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    result: result,
                }),
            });
            const rank = await res.json();
            setRank(rank.results);
        } catch (error) {
            console.error('Error updating the rank', error);
        }
    };

    useEffect(() => {
        getRank();
    }, []);

    return {
        rank,
        updateRank,
    };
};
