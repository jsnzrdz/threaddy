import { render, screen } from "@testing-library/react";
import { TweetModel } from "../../../models/tweet-model";
import TweetActionButtons from "./TweetActionButtons";
// import userEvent from "@testing-library/user-event";

// Mock para las funciones de callback
const mockOnMoveTweet = vitest.fn();
const mockOnDeleteTweet = vitest.fn();


describe("TweetActionButtons", () => {

    let tweet: TweetModel;

    function renderComponent(position: number, threadLength: number) {
        tweet = {
            threadPosition: position,
            textContent: "Test tweet",
            mediaContent: [null, null, null, null]
        }

        render(
            <TweetActionButtons
                threadLength={threadLength}
                tweet={tweet}
                onMoveTweet={mockOnMoveTweet}
                onDeleteTweet={mockOnDeleteTweet}
            />
        )
    }

    describe("when the component belongs to a single tweet in a thread", () => {
        beforeEach(() => renderComponent(0, 1));

        it("should not display arrow up button", () => {
            const arrowUpElement = screen.queryByLabelText('Move tweet up');
            expect(arrowUpElement).toBeNull();
        })
        it("should not display arrow down button", () => {
            const arrowDownElement = screen.queryByLabelText('Move tweet down');
            expect(arrowDownElement).toBeNull();
        })
        it("should not display delete button", () => {
            const deleteElement = screen.queryByLabelText('Delete tweet');
            expect(deleteElement).toBeNull();
        })
    });

    describe("when the component belongs to the first tweet in multi-tweet thread", () => {
        beforeEach(() => renderComponent(0, 5));

        it("should not display arrow up button", () => {
            const arrowUpElement = screen.queryByLabelText('Move tweet up');
            expect(arrowUpElement).toBeNull();
        })
        it("should display arrow down button", () => {
            const arrowDownElement = screen.queryByLabelText('Move tweet down');
            expect(arrowDownElement).toBeInTheDocument();
        })
        it("should display delete button", () => {
            const deleteElement = screen.queryByLabelText('Delete tweet');
            expect(deleteElement).toBeInTheDocument();
        })
    });

    describe("when the component belongs to a middle tweet in a thread", () => {
        beforeEach(() => renderComponent(2, 5));

        it("should display arrow up button", () => {
            const arrowUpElement = screen.queryByLabelText('Move tweet up');
            expect(arrowUpElement).toBeInTheDocument();
        })
        it("should display arrow down button", () => {
            const arrowDownElement = screen.queryByLabelText('Move tweet down');
            expect(arrowDownElement).toBeInTheDocument();
        })
        it("should display delete button", () => {
            const deleteElement = screen.queryByLabelText('Delete tweet');
            expect(deleteElement).toBeInTheDocument();
        })
    });

    describe("when the component belongs to a final tweet in a thread", () => {
        beforeEach(() => renderComponent(4, 5));

        it("should display arrow up button", () => {
            const arrowUpElement = screen.queryByLabelText('Move tweet up');
            expect(arrowUpElement).toBeInTheDocument();
        })
        it("should not display arrow down button", () => {
            const arrowDownElement = screen.queryByLabelText('Move tweet down');
            expect(arrowDownElement).toBeNull();
        })
        it("should display delete button", () => {
            const deleteElement = screen.queryByLabelText('Delete tweet');
            expect(deleteElement).toBeInTheDocument();
        })
    });
})

// Tests antiguos
/**
describe("TweetActionButtons component render", () => {

    let tweet: TweetModel;

    describe("Button's events of tweet action buttons", () => {
        beforeEach(() => {
            tweet = {
                threadPosition: 1,  // No es el primer tweet
                textContent: "Test tweet",
                mediaContent: [null, null, null, null]
            };

            render(
                <TweetActionButtons
                    threadLength={3}  // Más de 1 tweet en el hilo
                    tweet={tweet}
                    onMoveTweet={mockOnMoveTweet}
                    onDeleteTweet={mockOnDeleteTweet}
                />
            );
        });

        it("should call onMoveTweet (up) with correct positions when clicking the arrow up button", async () => {
            // Obtener el ícono de la flecha hacia arriba
            const arrowUpButton = screen.getByLabelText('Move tweet up');

            // Simular un clic en el ícono
            await userEvent.click(arrowUpButton);

            // Verificar que onMoveTweet haya sido llamada con los índices correctos
            expect(mockOnMoveTweet).toHaveBeenCalledTimes(1);
            expect(mockOnMoveTweet).toHaveBeenCalledWith(1, 0); // Al subir, mueve de posición 1 a posición 0
        });

        it("should call onMoveTweet (down) with correct positions when clicking the arrow up button", async () => {
            // Obtener el ícono de la flecha hacia arriba
            const arrowDownButton = screen.getByLabelText('Move tweet down');

            // Simular un clic en el ícono
            await userEvent.click(arrowDownButton);

            // Verificar que onMoveTweet haya sido llamada con los índices correctos
            expect(mockOnMoveTweet).toHaveBeenCalledTimes(1);
            expect(mockOnMoveTweet).toHaveBeenCalledWith(1, 2); // Al subir, mueve de posición 1 a posición 0
        });

        it("should call onDeleteTweet (delete) with correct positions when clicking the arrow up button", async () => {
            // Obtener el ícono de la flecha hacia arriba
            const deleteButton = screen.getByLabelText('Delete tweet');

            // Simular un clic en el ícono
            await userEvent.click(deleteButton);

            expect(mockOnDeleteTweet).toHaveBeenCalledTimes(1);
            expect(mockOnDeleteTweet).toHaveBeenCalledWith(1);
        });
    })

    describe("Initial tweet in a empty thread", () => {

        // Modelo de tweet inicial y una longitud de 1 solo tweet
        beforeEach(() => {
            tweet = {
                threadPosition: 0,
                textContent: "",
                mediaContent: [null, null, null, null]
            }

            render(
                <TweetActionButtons
                    threadLength={1}
                    tweet={tweet}
                    onMoveTweet={mockOnMoveTweet}
                    onDeleteTweet={mockOnDeleteTweet}
                />
            )
        });

        it("should not render arrow up button if tweet is the only tweet in the thread", () => {
            const arrowUpElement = screen.queryByLabelText('Move tweet up');
            expect(arrowUpElement).toBeNull();
        });

        it("should not render arrow down button if tweet is the only tweet in the thread", () => {
            const arrowUpElement = screen.queryByLabelText('Move tweet down');
            expect(arrowUpElement).toBeNull();
        });

        it("should not render delete button if tweet is the only tweet in the thread", () => {
            const arrowUpElement = screen.queryByLabelText('Delete tweet');
            expect(arrowUpElement).toBeNull();
        });
    })

    describe("First tweet in a thread with more than 1 tweet", () => {

        // Primer tweet de un hilo que tiene más de 1 tweet
        beforeEach(() => {
            tweet = {
                threadPosition: 0,
                textContent: "",
                mediaContent: [null, null, null, null]
            }

            render(
                <TweetActionButtons
                    threadLength={5}
                    tweet={tweet}
                    onMoveTweet={mockOnMoveTweet}
                    onDeleteTweet={mockOnDeleteTweet}
                />
            );
        });

        it("should render the arrow down button if it is the first tweet in a thread with more than one tweet", () => {
            const arrowUpElement = screen.queryByLabelText('Move tweet down');
            expect(arrowUpElement).toBeInTheDocument();
        });

        it("should not render the arrow up button if it is the first tweet in a thread with more than one tweet", () => {
            const arrowDownElement = screen.queryByLabelText('Move tweet up');
            expect(arrowDownElement).toBeNull();
        });

        it("should render the delete button if it is the first tweet in a thread with more than one tweet", () => {
            const arrowDownElement = screen.queryByLabelText('Delete tweet');
            expect(arrowDownElement).toBeInTheDocument();
        });

    });

    describe("Tweet in the middle of a thread with more than one tweet", () => {

        // Primer tweet de un hilo que tiene más de 1 tweet
        beforeEach(() => {
            tweet = {
                threadPosition: 3,
                textContent: "",
                mediaContent: [null, null, null, null]
            }

            render(
                <TweetActionButtons
                    threadLength={10}
                    tweet={tweet}
                    onMoveTweet={mockOnMoveTweet}
                    onDeleteTweet={mockOnDeleteTweet}
                />
            );
        });

        it("should render the arrow down button if it is tweet in middle of a thread with more than 1 tweet", () => {
            const arrowUpElement = screen.queryByLabelText('Move tweet down');
            expect(arrowUpElement).toBeInTheDocument();
        });

        it("should render the arrow up button if it is tweet in middle of a thread with more than 1 tweet", () => {
            const arrowDownElement = screen.queryByLabelText('Move tweet up');
            expect(arrowDownElement).toBeInTheDocument();
        });

        it("should render the delete button if it is tweet in middle of a thread with more than 1 tweet", () => {
            const arrowDownElement = screen.queryByLabelText('Delete tweet');
            expect(arrowDownElement).toBeInTheDocument();
        });

    });

    describe("Last tweet in the thread", () => {

        // Último tweet del hilo
        beforeEach(() => {
            tweet = {
                threadPosition: 5,
                textContent: "",
                mediaContent: [null, null, null, null]
            }

            render(
                <TweetActionButtons
                    threadLength={6}
                    tweet={tweet}
                    onMoveTweet={mockOnMoveTweet}
                    onDeleteTweet={mockOnDeleteTweet}
                />
            );
        });

        it("should render the arrow down button if it is tweet in middle of a thread with more than 1 tweet", () => {
            const arrowUpElement = screen.queryByLabelText('Move tweet down');
            expect(arrowUpElement).toBeNull();
        });

        it("should render the arrow up button if it is tweet in middle of a thread with more than 1 tweet", () => {
            const arrowDownElement = screen.queryByLabelText('Move tweet up');
            expect(arrowDownElement).toBeInTheDocument();
        });

        it("should render the delete button if it is tweet in middle of a thread with more than 1 tweet", () => {
            const arrowDownElement = screen.queryByLabelText('Delete tweet');
            expect(arrowDownElement).toBeInTheDocument();
        });

    });

    afterEach(() => {
        vitest.clearAllMocks();
    });
});

 */
