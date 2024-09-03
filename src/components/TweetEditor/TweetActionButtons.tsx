import { TweetModel } from "../../models/tweet-model"

interface TweetButtonsProps {
    threadLength: number,
    tweet: TweetModel,
    onMoveTweet: (index: number, targetIndex: number) => void,
    onDeleteTweet: (index: number) => void
}

export default function TweetActionButtons({ threadLength, tweet, onMoveTweet, onDeleteTweet }: TweetButtonsProps) {

    return (
        threadLength > 1 &&
        <>
            <div className="flex flex-col gap-2 absolute -right-6 bottom-3 cursor-pointer text-sky-600">
                {
                    // Mostrar fecha hacia arriba
                    tweet.threadPosition === 0 ?
                        "" :
                        <svg onClick={() => onMoveTweet(tweet.threadPosition, tweet.threadPosition - 1)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" strokeWidth={4} />
                        </svg>
                }
                {
                    // Mostrar flecha hacia abajo
                    threadLength === tweet.threadPosition + 1 ?
                        ""
                        :
                        <svg onClick={() => onMoveTweet(tweet.threadPosition, tweet.threadPosition + 1)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" strokeWidth={4} />
                        </svg>
                }
            </div>
            <div
                className="absolute -right-6 -top-3 font-bold text-4xl text-red-600 cursor-pointer"
                onClick={() => onDeleteTweet(tweet.threadPosition)}
            >
                -
            </div>
        </>
    )
}