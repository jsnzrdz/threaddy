import TweetMediaContentElement from "./TweetMediaContentElement"

interface TweetMediaContentElementList {
    mediaContentElements: Array<string | null>
}

export default function TweetMediaContentElementList({ mediaContentElements }: TweetMediaContentElementList) {
    const lastMediaContentIndex = mediaContentElements.findIndex(el => el === null);

    return (
        mediaContentElements.map((el, index) =>
            <TweetMediaContentElement key={index} element={el} isEnabled={lastMediaContentIndex == index}/>
        )
    )
}