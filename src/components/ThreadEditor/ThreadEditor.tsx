import { useState } from "react"
import { TweetModel } from "../../models/tweet-model";

import TweetEditor from "../TweetEditor/TweetEditor";
import ThreadButtons from "./ThreadButtons";
import TweetRelationIcon from "../TweetEditor/TweetRelationIcon";

const initialThread: TweetModel[] = [
    {
        threadPosition: 0,
        textContent: "",
        mediaContent: [null, null, null, null]
    }

]

export default function ThreadEditor() {
    const [tweets, setTweets] = useState<TweetModel[]>(initialThread);

    // Simplificado para usar el estado anterior
    const addTweet = () => {
        setTweets(prevTweets => [
            ...prevTweets,
            { threadPosition: prevTweets.length, textContent: "", mediaContent: [null, null, null, null] }
        ]);
    };

    // Utilización de funciones inmutables para actualizar el estado
    const updateTextContent = (index: number, value: string) => {
        setTweets(prevTweets => prevTweets.map((tweet, i) =>
            i === index ? { ...tweet, textContent: value } : tweet
        ));
    };

    const updateMediaContent = (index: number, value: string) => {
        setTweets(prevTweets =>
            prevTweets.map((tweet, i) => {
                if (i === index) {
                    // Encuentra el primer índice vacío en mediaContent
                    const nextAvailableIndex = tweet.mediaContent.findIndex((el) => el === null);

                    // Si hay una posición disponible, actualiza ese índice
                    if (nextAvailableIndex !== -1) {
                        // Crear una copia del array de mediaContent para mantener la inmutabilidad
                        const updatedMediaContent = [...tweet.mediaContent];
                        updatedMediaContent[nextAvailableIndex] = value;

                        // Retorna el tweet con el mediaContent actualizado
                        return { ...tweet, mediaContent: updatedMediaContent };
                    }
                }
                return tweet;
            })
        );
    };

    // Eliminación de tweet y reindexación en una sola operación inmutable
    const deleteTweet = (index: number) => {
        setTweets(prevTweets => {
            const updatedTweets = prevTweets.filter((_, i) => i !== index);
            return updatedTweets.map((tweet, i) => ({ ...tweet, threadPosition: i }));
        });
    };

    // Mover un tweet a la posición objetivo
    const moveTweet = (index: number, targetIndex: number) => {
        setTweets(prevTweets => {
            // Crear una copia del arreglo actual
            const updatedTweets = [...prevTweets];

            // Sacar el tweet de la posición actual
            const [movedTweet] = updatedTweets.splice(index, 1);

            // Insertar el tweet en la nueva posición
            updatedTweets.splice(targetIndex, 0, movedTweet);

            // Reindexar todos los tweets para asegurar que las posiciones sean correctas
            return updatedTweets.map((tweet, i) => ({ ...tweet, threadPosition: i }));
        })
    }

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
                                onUpdateTextContent={updateTextContent}
                                onUpdateMediaContent={updateMediaContent}
                                onDeleteTweet={deleteTweet}
                                onMoveTweet={moveTweet}
                            />

                            {/* Icono de puntos que une los distintos tweets del hilo */}
                            {
                                // mostrar entre dos tweets si no es el primero ni el último y hay más de un tweet
                                index < tweets.length - 1 && index !== tweets.length - 1 &&
                                <TweetRelationIcon />
                            }
                        </li>
                    )
                }
            </ol>

            {/* Botones de añadir tweet y guardar hilo */}
            <ThreadButtons onAddTweet={addTweet} visible={tweets.length > 0} />
        </div>
    )
}
