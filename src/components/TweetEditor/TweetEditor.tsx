import { TweetModel } from "../../models/tweet-model";
import TweetActionButtons from "./TweetActionButtons";
import { TweetDesign } from "./TweetDesign";

interface TweetEditorProps {
    tweet: TweetModel,
    threadLength: number,
    onUpdateContent: (index: number, textContent: string) => void,
    onDeleteTweet: (index: number) => void,
    onMoveTweet: (index: number, targetIndex: number) => void
}

export default function TweetEditor({ tweet, threadLength, onUpdateContent, onMoveTweet, onDeleteTweet }: TweetEditorProps) {

    // Callback de edición para actualizar estado interno del componente y el general del threadEditor
    function updateTextContentState(value: string) {
        onUpdateContent(tweet.threadPosition, value);
    }

    return (
        <div className="flex-grow min-w-0 max-w-lg">

            <div className="relative">
                {/* texto del tweet y sus imágenes */}
                <TweetDesign tweet={tweet} onTextContentUpdate={updateTextContentState}/>

                {/* botones de ordenamiento y borrado */}
                <TweetActionButtons threadLength={threadLength} tweet={tweet} onMoveTweet={onMoveTweet} onDeleteTweet={onDeleteTweet} />
            </div>
        </div>
    )
}