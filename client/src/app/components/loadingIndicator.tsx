export default function LoadingIndicator() {
    return (
        <div className="flex justify-center mb-4">
            <img
                className="w-12"
                src="/loading.gif"
                alt="Wait until IA chooses a move"
            />
        </div>
    );
}
