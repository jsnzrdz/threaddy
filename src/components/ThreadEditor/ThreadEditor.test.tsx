import { render, screen } from "@testing-library/react";
import ThreadEditor from "./ThreadEditor";

describe("Thread Editor component", () => {
    it("should render an initial tweet", () => {
        render(<ThreadEditor />);

        const tweetList = screen.getByRole("list");
        expect(tweetList).toBeInTheDocument();
        
        const tweetItems = screen.getAllByRole("listitem");
        expect(tweetItems).toHaveLength(1);
    });
});
