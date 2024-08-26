import { useState } from "react"
import { TweetModel } from "../../models/tweet-model";

import TweetEditor from "../TweetEditor/TweetEditor";
import ThreadButtons from "./ThreadButtons";
import TweetRelationIcon from "../TweetEditor/TweetRelationIcon";

const initialThread: TweetModel[] = [
    {
        threadPosition: 0,
        textContent: ""
    } as TweetModel
]

export default function ThreadEditor() {
    const [tweets, setTweets] = useState<TweetModel[]>(initialThread);

    // Simplificado para usar el estado anterior
    const addTweet = () => {
        setTweets(prevTweets => [
            ...prevTweets,
            { threadPosition: prevTweets.length, textContent: "" }
        ]);
    };

    // Utilización de funciones inmutables para actualizar el estado
    const updateTweetContent = (index: number, value: string) => {
        setTweets(prevTweets => prevTweets.map((tweet, i) =>
            i === index ? { ...tweet, textContent: value } : tweet
        ));
    };

    // Eliminación de tweet y reindexación en una sola operación inmutable
    const deleteTweet = (index: number) => {
        setTweets(prevTweets => {
            const updatedTweets = prevTweets.filter((_, i) => i !== index);
            return updatedTweets.map((tweet, i) => ({ ...tweet, threadPosition: i }));
        });
    };

    return (
        <div className="min-w-0 w-[30rem] mx-4 md:mx-0 flex flex-col gap-4">

            {/* Título de la página */}
            <h2 className="text-xl font-semibold text-center">¡Empieza a escribir tu hilo! 🧵</h2>

            {/* Lista de tweets que representa el hilo completo */}
            <ol className="mt-6 flex flex-col gap-2">
                {
                    tweets.map((tweet, index) =>
                        <li key={tweet.threadPosition}>

                            {/* Editor del tweet */}
                            <TweetEditor
                                tweet={tweet}
                                threadLength={tweets.length}
                                onUpdateContent={updateTweetContent}
                                onDeleteTweet={deleteTweet}
                            />

                            {/* Icono de puntos que une los distintos tweets del hilo */}
                            <TweetRelationIcon visible={index < tweets.length - 1 && index !== tweets.length - 1} />
                        </li>
                    )
                }
            </ol>

            {/* Botones de añadir tweet y guardar hilo */}
            <ThreadButtons onAddTweet={addTweet} visible={tweets.length > 0} />
        </div>
    )
}
