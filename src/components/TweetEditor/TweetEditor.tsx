import { useEffect, useState } from "react";
import { TweetModel } from "../../models/tweet-model";
import TweetActionButtons from "./TweetActionButtons";
import TweetAvailableChars from "./TweetAvailableChars";
import { TweetImageButton } from "./TweetImageButton";

interface TweetEditorProps {
    tweet: TweetModel,
    threadLength: number,
    onUpdateContent: (index: number, textContent: string) => void,
    onDeleteTweet: (index: number) => void,
    onMoveTweet: (index: number, targetIndex: number) => void
}

export default function TweetEditor({ tweet, threadLength, onUpdateContent, onMoveTweet, onDeleteTweet }: TweetEditorProps) {

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



                <TweetImageButton />

                <TweetAvailableChars currentTextContent={currentTextContent} />

                <TweetActionButtons visible={threadLength > 1} threadLength={threadLength} tweet={tweet} onMoveTweet={onMoveTweet} onDeleteTweet={onDeleteTweet} />
            </div>
        </div>
    )
}