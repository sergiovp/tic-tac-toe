import Button from './button';
import Modal from './modal';

type GameMenuProps = {
    handleRankOnClick: () => void;
    handleReset: () => void;
    closeModal: () => void;
    isOpen: boolean;
    mainModalContent: string;
};

export default function GameMenu({
    handleRankOnClick,
    handleReset,
    closeModal,
    isOpen,
    mainModalContent,
}: GameMenuProps) {
    return (
        <section className="flex justify-around mt-4">
            <Button
                onClick={handleRankOnClick}
                styles="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                value="Rank"
            />
            <Button
                onClick={() => handleReset()}
                styles="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounde"
                value="Reset"
            />
            <Modal
                closeModal={closeModal}
                isOpen={isOpen}
                title="Player Rank"
                mainContent={mainModalContent}
            />
        </section>
    );
}
