interface ThreadButtonsProps {
    visible: boolean,
    onAddTweet: () => void
}

export default function ThreadButtons({ visible, onAddTweet }: ThreadButtonsProps) {
    return (
        // Los botones solo se muestran después del último tweet
        visible &&
        <div className="mt-2 flex flex-col gap-2 md:flex-row md:justify-between">
            {/* Botón de añadir un nuevo tweet al hilo */}
            <button
                className="min-w-28 py-2 px-3 border border-white rounded-md font-semibold tracking-wider"
                onClick={onAddTweet}
            >
                + Añadir tweet
            </button>

            {/* Botón de guardado del hilo */}
            <button
                className="min-w-28 py-2 px-3 bg-sky-600 rounded-md font-semibold tracking-wider"
            >
                Guardar
            </button>
        </div>
    );
}