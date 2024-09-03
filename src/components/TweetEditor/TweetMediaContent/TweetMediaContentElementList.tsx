import TweetMediaContentElement from "./TweetMediaContentElement"

interface TweetMediaContentElementList {
    mediaContentElements: Array<string | null>
}

export default function TweetMediaContentElementList({ mediaContentElements }: TweetMediaContentElementList) {

    return (
        mediaContentElements.map((el, index) =>
            <TweetMediaContentElement key={index} element={el} />
        )
    )
}