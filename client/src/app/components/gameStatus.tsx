type GameStatusProps = { winner: Winner };

export default function GameStatus({ winner }: GameStatusProps) {
    return (
        <section>
            {winner &&
                (winner !== 'draw' ? (
                    <h3>The winner is {winner}</h3>
                ) : (
                    <h3>Draw!</h3>
                ))}
        </section>
    );
}
