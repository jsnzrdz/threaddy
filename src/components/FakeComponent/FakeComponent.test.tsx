import { render, screen } from "@testing-library/react";
import FakeComponent from "./FakeComponent";

describe("FakeComponent", () => {

    test("fake component renders correctly", () => {
        render(<FakeComponent />);

        const textElement = screen.getByText(/fake component/i);
        expect(textElement).toBeInTheDocument();
    });
    
});