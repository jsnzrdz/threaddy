import { useState } from "react"
import { TweetModel } from "../models/tweet-model";
import TweetEditor from "./TweetEditor";

const initialThread: TweetModel[] = [
    {
        threadPosition: 0,
        textContent: ""
    } as TweetModel
]

export default function ThreadEditor() {
    const [tweets, setTweets] = useState<TweetModel[]>(initialThread);

    // Simplificado para usar el estado anterior.
    const addTweet = () => {
        setTweets(prevTweets => [
            ...prevTweets,
            { threadPosition: prevTweets.length, textContent: "" }
        ]);
    };

    // Utilización de funciones inmutables para actualizar el estado.
    const updateTweetContent = (index: number, value: string) => {
        setTweets(prevTweets => prevTweets.map((tweet, i) =>
            i === index ? { ...tweet, textContent: value } : tweet
        ));
    };

    // Eliminación de tweet y reindexación en una sola operación inmutable.
    const deleteTweet = (index: number) => {
        setTweets(prevTweets => {
            const updatedTweets = prevTweets.filter((_, i) => i !== index);
            return updatedTweets.map((tweet, i) => ({ ...tweet, threadPosition: i }));
        });
    };

    return (
        <div className="min-w-0 w-[30rem] my-16 mx-4 md:mx-0 flex flex-col gap-4">
            <h2 className="text-xl font-semibold text-center">¡Empieza a escribir tu hilo! 🧵</h2>

            <ol className="mt-6 flex flex-col gap-4">
                {
                    tweets.map((tweet, index) =>
                        <li key={tweet.threadPosition}>

                            <TweetEditor
                                tweet={tweet}
                                isTheOnlyTweet={tweets.length === 1}
                                onUpdateContent={updateTweetContent}
                                onDeleteTweet={deleteTweet}
                            />

                            <div className="mt-4">
                                {
                                    // Mostrar el botón de añadir si es el último tweet
                                    index === tweets.length - 1 &&
                                    <div className="flex flex-col gap-4 md:flex-row md:justify-between">
                                        <button
                                            className="min-w-28 py-2 px-3 border border-white rounded-md font-semibold tracking-wider"
                                            onClick={addTweet}
                                        >
                                            + Añadir tweet
                                        </button>

                                        <button
                                            className="min-w-28 py-2 px-3 bg-sky-600 rounded-md font-semibold tracking-wider"
                                        >
                                            Guardar
                                        </button>
                                    </div>
                                }
                            </div>
                        </li>
                    )
                }
            </ol>
        </div>
    )
}
