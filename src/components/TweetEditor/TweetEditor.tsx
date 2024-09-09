import { TweetModel } from "../../models/tweet-model";
import TweetActionButtons from "./TweetActionButtons/TweetActionButtons";
import { TweetDesign } from "./TweetDesign";

interface TweetEditorProps {
    tweet: TweetModel,
    threadLength: number,
    onUpdateTextContent: (index: number, textContent: string) => void,
    onUpdateMediaContent: (index: number, mediaContent: string) => void,
    onDeleteTweet: (index: number) => void,
    onMoveTweet: (index: number, targetIndex: number) => void
}

export default function TweetEditor({ tweet, threadLength, onUpdateTextContent, onUpdateMediaContent, onMoveTweet, onDeleteTweet }: TweetEditorProps) {

    // Callback de edición para actualizar estado interno del componente y el general del threadEditor
    function updateTextContentState(value: string) {
        onUpdateTextContent(tweet.threadPosition, value);
    }

    function updateMediaContentState(value: string) {
        console.log("updateMediaContentState ", value);
        onUpdateMediaContent(tweet.threadPosition, value);
    }

    return (
        <div className="flex-grow min-w-0 max-w-lg">

            <div className="relative">
                {/* texto del tweet y sus imágenes */}
                <TweetDesign
                    tweet={tweet}
                    onTextContentUpdate={updateTextContentState}
                    onMediaContentUpdate={updateMediaContentState}
                />

                {/* botones de ordenamiento y borrado */}
                <TweetActionButtons
                    threadLength={threadLength}
                    tweet={tweet}
                    onMoveTweet={onMoveTweet}
                    onDeleteTweet={onDeleteTweet}
                />
            </div>
        </div>
    )
}