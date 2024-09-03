interface TweetMediaContentElementProps {
    element: string | null
}

export default function TweetMediaContentElement({element}: TweetMediaContentElementProps) {

    return (
        <div className="border-gray-600 border border-dashed h-32 w-full"></div>
    );
}