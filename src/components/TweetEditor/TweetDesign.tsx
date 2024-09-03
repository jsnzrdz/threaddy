import { useEffect, useState } from "react";
import TweetAvailableChars from "./TweetAvailableChars";
import { TweetImageButton } from "./TweetImageButton";
import { TweetModel } from "../../models/tweet-model";
import TweetMediaContent from "./TweetMediaContent/TweetMediaContent";

interface TweetDesignProps {
    tweet: TweetModel,
    onTextContentUpdate: (value: string) => void,
    onMediaContentUpdate: (value: string) => void
}

export function TweetDesign({ tweet, onTextContentUpdate, onMediaContentUpdate }: TweetDesignProps) {

    // Contenido de tipo texto del tweet
    const [currentTextContent, setCurrentTextContent] = useState<string>(tweet.textContent ? tweet.textContent : "");
    const [currentMediaContent, setCurrentMediaContent] = useState<Array<string | null>>(tweet.mediaContent);

    // useEffect para sincronizar el estado local con el estado global cuando el tweet cambia
    useEffect(() => {
        setCurrentTextContent(tweet.textContent);
        setCurrentMediaContent(tweet.mediaContent);
    }, [tweet.textContent, tweet.mediaContent]);

    return (
        <div className="flex flex-col gap-4 py-3 px-4 w-full bg-gray-900/80 border border-gray-600 rounded-lg resize-none">

            {/* contenido de texto del tweet */}
            <textarea
                className="bg-transparent resize-none w-full h-32"
                value={currentTextContent}
                placeholder="Escribe tu tweet aquí..."
                onChange={(e) => onTextContentUpdate(e.target.value)}
            >
            </textarea>

            {/* botón añadir imágenes y contador de carácteres disponibles */}
            <div className="flex justify-between">
                <TweetImageButton onFileUpdated={onMediaContentUpdate}/>
                <TweetAvailableChars currentTextContent={currentTextContent} />
            </div>

            {/* preview de imágenes y videos */}
            <TweetMediaContent mediaContentElements={currentMediaContent}/>
        </div>
    )
}