import TweetMediaContentPreviewItem from "./TweetMediaContentPreviewItem";

interface TweetMediaContentPreviewProps {
    mediaContentItems: []
}

export default function TweetMediaContentPreview({mediaContentItems}: TweetMediaContentPreviewProps) {

    return (
        mediaContentItems.length > 0 &&
        <div className="grid grid-cols-2 grid-rows-2 gap-4">
            <TweetMediaContentPreviewItem />
            <TweetMediaContentPreviewItem />
            <TweetMediaContentPreviewItem />
            <TweetMediaContentPreviewItem />
        </div>
    );
}