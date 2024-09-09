import { render, screen } from "@testing-library/react";
import { TweetModel } from "../../../models/tweet-model";
import TweetActionButtons from "./TweetActionButtons";

// Mock para las funciones de callback
const mockOnMoveTweet = vitest.fn();
const mockOnDeleteTweet = vitest.fn();

describe("TweetActionButtons component render", () => {

    let tweet: TweetModel;
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

    })

    afterEach(() => {
        vitest.clearAllMocks();
    });
});