import { useEffect, useState } from "react";
import { TweetModel } from "../models/tweet-model";

interface TweetEditorProps {
    tweet: TweetModel,
    isTheOnlyTweet: boolean,
    onUpdateContent: (index: number, textContent: string) => void,
    onDeleteTweet: (index: number) => void
}

// Máximo de caracteres de un tweet
const AVAILABLE_CHARS: number = 162;

// Calcula el número de caracteres restantes del tweet
function getAvailableChars(currentTextContent: string) {
    return (AVAILABLE_CHARS - currentTextContent.length).toString();
}

export default function TweetEditor({ tweet, isTheOnlyTweet, onUpdateContent, onDeleteTweet }: TweetEditorProps) {

    // Contenido de tipo texto del tweet
    const [currentTextContent, setCurrentTextContent] = useState<string>(tweet.textContent ? tweet.textContent : "");

    // Callback de edición para actualizar estado interno del componente y el general del threadEditor
    function updateTextContentState(value: string) {
        setCurrentTextContent(value);
        onUpdateContent(tweet.threadPosition, value);
    }

    // useEffect para sincronizar el estado local con el estado global cuando el tweet cambia
    useEffect(() => {
        setCurrentTextContent(tweet.textContent);
    }, [tweet.textContent]);

    return (
        <div className="flex-grow min-w-0 max-w-lg animate-in fade-in duration-1000">

            <div className="relative">
                <textarea
                    className="py-3 px-4 h-32 w-full bg-gray-900/40 text-white border border-white rounded-lg resize-none"
                    value={currentTextContent}
                    placeholder="Escribe tu tweet aquí..."
                    onChange={(e) => updateTextContentState(e.target.value)}
                />
                <div className="absolute right-2 bottom-2 text-sm text-gray-400">
                    {getAvailableChars(currentTextContent)}
                </div>
                {
                    isTheOnlyTweet ?
                        "" :
                        <div
                            className="absolute -right-6 -top-4 font-bold text-4xl text-red-600 cursor-pointer"
                            onClick={() => onDeleteTweet(tweet.threadPosition)}
                        >
                            -
                        </div>

                }
            </div>
        </div>
    )
}