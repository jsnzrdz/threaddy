import { useState } from "react";
import TweetMediaContentElementList from "./TweetMediaContentElementList";


export default function TweetMediaContent() {
    const [mediaContentElements, setMediaContentElements] = useState<Array<string | null>>([null, null, null, null]);
    
    return (
            // Si existe algún contenido multimedia para el TweetMediaContent, mostrar lista
            hasMediaContent(mediaContentElements) && (
                <div className="grid grid-cols-2 grid-rows-2 gap-4">
                    <TweetMediaContentElementList mediaContentElements={mediaContentElements}/>
                </div>
            )
        
    );
}

// Comprobar si existe al menos un contenido multimedia
function hasMediaContent(mediaContent: Array<string | null>) {
    return mediaContent.some(el => el !== null);
}