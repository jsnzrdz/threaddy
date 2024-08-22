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
        <div className="flex-grow min-w-0 max-w-lg">

            <div className="relative">
                <textarea
                    className="py-3 px-4 h-32 w-full bg-gray-900/80 border border-gray-600 rounded-lg resize-none"
                    value={currentTextContent}
                    placeholder="Escribe tu tweet aquí..."
                    onChange={(e) => updateTextContentState(e.target.value)}
                />
                <div className="absolute right-2 bottom-3 text-sm text-gray-400">
                    {getAvailableChars(currentTextContent)}
                </div>
                {
                    isTheOnlyTweet ?
                        "" :
                        <div>
                            <div className="flex flex-col gap-2 absolute -right-6 bottom-3 cursor-pointer text-sky-600">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" strokeWidth={4} />
                                </svg>

                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" strokeWidth={4} />
                                </svg>


                            </div>
                            <div
                                className="absolute -right-6 -top-3 font-bold text-4xl text-red-600 cursor-pointer"
                                onClick={() => onDeleteTweet(tweet.threadPosition)}
                            >
                                -
                            </div>
                        </div>


                }
            </div>
        </div>
    )
}