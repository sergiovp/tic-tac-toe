import styles from './ui/styles/page.module.css';
import Tictactoe from './components/tictactoe';

export default function Home() {
    return (
        <div className={styles.container}>
            <Tictactoe />
        </div>
    );
}
