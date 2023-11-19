'use client';

import styles from '../ui/styles/page.module.css';
import Square from './square';
import { useGame } from '../hooks/useGame';
import useModal from '../hooks/useModal';
import GameStatus from './gameStatus';
import DiffilcutySelector from './diffilcutySelector';
import GameMenu from './gameMenu';
import LoadingIndicator from './loadingIndicator';
import { useReducer } from 'react';

export default function Board() {
    const {
        boardData,
        updateBoard,
        rank,
        winner,
        changeDifficulty,
        gameDifficulty,
        turn,
        loading,
        resetGame,
    } = useGame();

    const { isOpen, openModal, closeModal } = useModal();

    const handleSquareClick = (index: number) => {
        if (turn === 'O') {
            return;
        }
        updateBoard(index);
    };

    const mainModalContent = rank
        ? `Victories: ${rank.victories}, Defeats: ${rank.defeats}, Draws: ${rank.draws}`
        : 'Rank could not be retrieved';

    return (
        <div>
            <GameStatus winner={winner} />

            {loading && !winner && <LoadingIndicator />}

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
                handleRankOnClick={() => openModal()}
                handleReset={() => resetGame()}
                mainModalContent={mainModalContent}
                isOpen={isOpen}
                closeModal={closeModal}
            />

            <DiffilcutySelector
                onChange={changeDifficulty}
                gameDifficulty={gameDifficulty}
            />
        </div>
    );
}
