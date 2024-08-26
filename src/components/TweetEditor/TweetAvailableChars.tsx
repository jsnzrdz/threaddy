interface TweetAvailableCharsProps {
    currentTextContent: string
}
// Máximo de caracteres de un tweet
const AVAILABLE_CHARS: number = 162;

// Calcula el número de caracteres restantes del tweet
function getAvailableChars(currentTextContent: string) {
    return (AVAILABLE_CHARS - currentTextContent.length).toString();
}

export default function TweetAvailableChars({ currentTextContent }: TweetAvailableCharsProps) {

    return (
        <div className="absolute right-2 bottom-3 text-sm text-gray-400">
            {getAvailableChars(currentTextContent)}
        </div>
    );
}