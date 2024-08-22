import { useState } from "react"
import { TweetModel } from "../models/tweet-model";
import TweetEditor from "./TweetEditor";

const fakeTweets: TweetModel[] = [
    {
        threadPosition: 0,
        textContent: ""
    }
]



export default function ThreadEditor() {
    const [tweets, setTweets] = useState<TweetModel[]>(fakeTweets);

    function addTweet() {

        // Crear el nuevo tweet con una posición siguiente
        const newTweet = new TweetModel();
        newTweet.threadPosition = tweets.length;

        console.log("new teweet", newTweet);
        setTweets([...tweets, newTweet])
    }

    return (
        <div className="min-w-0 w-[30rem] my-16 mx-8 md:mx-0 flex flex-col gap-4">
            <h2 className="text-xl font-semibold text-center">¡Empieza a escribir tu hilo! 🧵</h2>

            <ol className="mt-6 flex flex-col gap-4">
                {
                    tweets.map((tweet, index) =>
                        <li key={index}>
                            <TweetEditor tweet={tweet} />

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
