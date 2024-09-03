import { useEffect, useState } from "react";
import TweetAvailableChars from "./TweetAvailableChars";
import { TweetImageButton } from "./TweetImageButton";
import { TweetModel } from "../../models/tweet-model";
import TweetMediaContentPreview from "./TweetMediaContent/TweetMediaContentPreview";

interface TweetDesignProps {
    tweet: TweetModel,
    onTextContentUpdate: (value: string) => void
}

export function TweetDesign({ tweet, onTextContentUpdate }: TweetDesignProps) {

    // Contenido de tipo texto del tweet
    const [currentTextContent, setCurrentTextContent] = useState<string>(tweet.textContent ? tweet.textContent : "");
    const [mediaContentItems, setMediaContentItems] = useState<[]>([]);

    // useEffect para sincronizar el estado local con el estado global cuando el tweet cambia
    useEffect(() => {
        setCurrentTextContent(tweet.textContent);
    }, [tweet.textContent]);

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
                <TweetImageButton />
                <TweetAvailableChars currentTextContent={currentTextContent} />
            </div>

            {/* preview de imágenes y videos */}
            <TweetMediaContentPreview mediaContentItems={mediaContentItems}/>
        </div>
    )
}