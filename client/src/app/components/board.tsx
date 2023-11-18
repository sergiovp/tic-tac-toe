'use client';

import styles from '../ui/styles/page.module.css';
import Square from './square';
import { useBoard } from '../hooks/useBoard';
import useModal from '../hooks/useModal';
import GameStatus from './gameStatus';
import DiffilcutySelector from './diffilcutySelector';
import GameMenu from './gameMenu';

export default function Board({}) {
    const {
        boardData,
        updateBoard,
        resetBoard,
        rank,
        winner,
        setWinner,
        onDifficultyChange,
        gameDifficulty,
        turn,
        resetTurn,
        loading,
    } = useBoard();

    const { isOpen, openModal, closeModal } = useModal();

    const handleSquareClick = (index: number) => {
        if (turn === 'O') {
            return;
        }

        if (!winner) {
            updateBoard(index);
        }
    };

    const handleReset = () => {
        resetBoard();
        setWinner(null);
        resetTurn();
    };

    const handleRankOnClick = () => {
        openModal();
    };

    const mainModalContent = rank
        ? `Victories: ${rank.victories}, Defeats: ${rank.defeats}, Draws: ${rank.draws}`
        : 'Rank could not be retrieved';

    return (
        <div>
            <GameStatus winner={winner} />

            {loading && !winner && (
                <div className="flex justify-center mb-4">
                    <img
                        className="w-12"
                        src="/loading.gif"
                        alt="Wait until IA chooses a move"
                    />
                </div>
            )}

            <section className={styles.board}>
                {boardData.map((squareValue, index) => {
                    return (
                        <Square
                            key={index}
                            value={squareValue}
                            onClick={() => handleSquareClick(index)}
                        />
                    );
                })}
            </section>

            <GameMenu
                handleRankOnClick={handleRankOnClick}
                handleReset={handleReset}
                mainModalContent={mainModalContent}
                isOpen={isOpen}
                closeModal={closeModal}
            />

            <DiffilcutySelector
                onChange={onDifficultyChange}
                gameDifficulty={gameDifficulty}
            />
        </div>
    );
}
