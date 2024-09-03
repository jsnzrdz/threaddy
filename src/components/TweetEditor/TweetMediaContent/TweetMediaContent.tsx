import TweetMediaContentElementList from "./TweetMediaContentElementList";

interface TweetMediaContentProps {
    mediaContentElements: Array<string | null>
}

export default function TweetMediaContent({mediaContentElements} : TweetMediaContentProps) {
    
    // Si existe algún contenido multimedia para el TweetMediaContent, mostrar lista
    if (mediaContentElements) {
        
        return (
                (hasMediaContent(mediaContentElements)) && (
                    <div className="grid grid-cols-2 grid-rows-2 gap-4">
                        <TweetMediaContentElementList mediaContentElements={mediaContentElements}/>
                    </div>
                )
        );
    }

}

// Comprobar si existe al menos un contenido multimedia
function hasMediaContent(mediaContent: Array<string | null>) {
    return mediaContent.some(el => el !== null);
}