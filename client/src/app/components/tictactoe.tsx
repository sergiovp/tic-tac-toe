import Board from './board';
import styles from '../ui/styles/page.module.css';

export default function Tictactoe({}) {
    return (
        <main className={styles.main}>
            <h1>Tic Tac Toe</h1>
            <Board />
        </main>
    );
}
