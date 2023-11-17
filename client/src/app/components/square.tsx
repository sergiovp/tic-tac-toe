import { ReactNode } from 'react';
import styles from '../ui/styles/page.module.css';

type SquareProps = {
    value: string | null;
    onClick: () => void;
};

export default function Square({ value, onClick }: SquareProps) {
    return (
        <div onClick={onClick} className={styles.square}>
            {value}
        </div>
    );
}
