const API_URL = process.env.NEXT_API_URL ?? 'http://localhost:7777';

export const useGameAPI = (
    boardData: Board,
    winner: Winner,
    gameDifficulty: GameDifficulty,
) => {
    const fetchGetRank = async () => {
        try {
            const res = await fetch(`${API_URL}/game/rank`);
            const data = await res.json();
            return data.results;
        } catch (error) {
            console.error('Error getting rank:', error);
        }
    };

    const fetchWinner = async () => {
        if (boardData.every((board) => board !== null)) {
            return 'Draw';
        }
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

            return data.winner;
        } catch (error) {
            console.error('Error getting winner:', error);
        }
    };

    const fetchUpdateRank = async () => {
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
            const data = await res.json();

            return data.results;
        } catch (error) {
            console.error('Error updating the rank', error);
        }
    };

    const fetchGetMove = async () => {
        try {
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

            return nextMove;
        } catch (error) {
            console.error('Error getting move:', error);
        }
    };

    return {
        fetchGetMove,
        fetchUpdateRank,
        fetchWinner,
        fetchGetRank,
    };
};
