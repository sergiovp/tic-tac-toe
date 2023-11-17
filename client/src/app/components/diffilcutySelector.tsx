type DiffilcutySelectorProps = {
    gameDifficulty: GameDifficulty;
    onChange: (gameDiffilcuty: GameDifficulty) => void;
};

export default function DiffilcutySelector({
    onChange,
    gameDifficulty,
}: DiffilcutySelectorProps) {
    return (
        <div className="mt-8">
            <h3>Select difficulty:</h3>
            <div className="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
                <input
                    checked={gameDifficulty === 'easy'}
                    id="bordered-radio-1"
                    onChange={() => onChange('easy')}
                    type="radio"
                    value="easy"
                    name="bordered-radio"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                    htmlFor="bordered-radio-1"
                    className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                    Easy
                </label>
            </div>
            <div className="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
                <input
                    checked={gameDifficulty === 'impossible'}
                    id="bordered-radio-2"
                    type="radio"
                    onChange={() => onChange('impossible')}
                    value="impossible"
                    name="bordered-radio"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                    htmlFor="bordered-radio-2"
                    className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                    Impossible
                </label>
            </div>
        </div>
    );
}
