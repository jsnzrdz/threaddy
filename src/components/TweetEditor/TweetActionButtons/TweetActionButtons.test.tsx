import { render, screen } from "@testing-library/react";
import { TweetModel } from "../../../models/tweet-model";
import TweetActionButtons from "./TweetActionButtons";

// Mock para las funciones de callback
const mockOnMoveTweet = vitest.fn();
const mockOnDeleteTweet = vitest.fn();

describe("TweetActionButtons Component", () => {

    const tweet: TweetModel = {
        threadPosition: 0,
        textContent: "",
        mediaContent: [null, null, null, null]
    };

    // Caso de uso inicial (hilo con 1 tweet vacío)
    it("should not render arrow up button if tweet is the only tweet in the thread", () => {
        render(
            <TweetActionButtons 
                threadLength={1}
                tweet={{...tweet, threadPosition: 0}}
                onMoveTweet={mockOnMoveTweet}
                onDeleteTweet={mockOnDeleteTweet}
            />
        )

        const arrowUpElement = screen.queryByTestId('arrow-up');
        expect(arrowUpElement).toBeNull();
    });

    it("should not render arrow down button if tweet is the only tweet in the thread", () => {
        render(
            <TweetActionButtons 
                threadLength={1}
                tweet={tweet}
                onMoveTweet={mockOnMoveTweet}
                onDeleteTweet={mockOnDeleteTweet}
            />
        )

        const arrowUpElement = screen.queryByTestId('arrow-down');
        expect(arrowUpElement).toBeNull();
    });

    it("should not render delete button if tweet is the only tweet in the thread", () => {
        render(
            <TweetActionButtons 
                threadLength={1}
                tweet={tweet}
                onMoveTweet={mockOnMoveTweet}
                onDeleteTweet={mockOnDeleteTweet}
            />
        )

        const arrowUpElement = screen.queryByTestId('delete');
        expect(arrowUpElement).toBeNull();
    });

    // Primer tweet de un hilo que tiene más de 1 tweet
    
    it("should render the arrow down button if it is the first tweet in a thread with more than one tweet", () => {
        render(
            <TweetActionButtons 
                threadLength={2}
                tweet={{...tweet, threadPosition: 0}}
                onMoveTweet={mockOnMoveTweet}
                onDeleteTweet={mockOnDeleteTweet}
            />
        )

        const arrowUpElement = screen.queryByTestId('arrow-down');
        expect(arrowUpElement).toBeInTheDocument();
    })

    it("should not render the arrow up button if it is the first tweet in a thread with more than one tweet", () => {
        render(
            <TweetActionButtons 
                threadLength={2}
                tweet={{...tweet, threadPosition: 0}}
                onMoveTweet={mockOnMoveTweet}
                onDeleteTweet={mockOnDeleteTweet}
            />
        )

        const arrowDownElement = screen.queryByTestId('arrow-up');
        expect(arrowDownElement).toBeNull();
    })

    it("should render the delete button if it is the first tweet in a thread with more than one tweet", () => {
        render(
            <TweetActionButtons 
                threadLength={2}
                tweet={{...tweet, threadPosition: 0}}
                onMoveTweet={mockOnMoveTweet}
                onDeleteTweet={mockOnDeleteTweet}
            />
        )

        const arrowDownElement = screen.queryByTestId('delete');
        expect(arrowDownElement).toBeInTheDocument();
    })
});