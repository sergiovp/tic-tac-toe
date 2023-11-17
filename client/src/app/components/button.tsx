type ButtonProps = {
    value: string;
    onClick: () => void;
    styles: string;
};

export default function Button({ value, styles, onClick }: ButtonProps) {
    return (
        <button onClick={onClick} className={styles}>
            {value}
        </button>
    );
}
