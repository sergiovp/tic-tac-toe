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
    } = useBoard();

    const { isOpen, openModal, closeModal } = useModal();

    const handleSquareClick = (index: number) => {
        if (!winner) {
            updateBoard(index);
        }
    };

    const handleReset = () => {
        resetBoard();
        setWinner(null);
    };

    const handleRankOnClick = () => {
        openModal();
    };

    const mainModalContent = `Victories: ${rank.victories}, Defeats: ${rank.defeats}, Draws: ${rank.draws}`;

    return (
        <div>
            <GameStatus winner={winner} />

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
