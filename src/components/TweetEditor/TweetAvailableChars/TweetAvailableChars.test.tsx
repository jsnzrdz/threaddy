import { render, screen } from "@testing-library/react";
import TweetAvailableChars from "./TweetAvailableChars";

describe("TweetAvailableChars Component", () => {

    // Test de renderizado inicial sin texto
    it(`should show 162 characteres remaining if no text is provided`, () => {
        render(<TweetAvailableChars currentTextContent=""/>);
        const chartsLeft = screen.getByText('162');
        expect(chartsLeft).toBeInTheDocument();
    });

    // Test de renderizado de un texto corto
    it(`should show 151 characteres remaining if 'Hello world' is provided`, () => {
        render(<TweetAvailableChars currentTextContent='Hello world'/>);
        const chartsLeft = screen.getByText('151');
        expect(chartsLeft).toBeInTheDocument();
    });

    // Test de renderizado de un texto con 162 caracteres
    it(`should show 0 characteres remaining if 162 caracteres string is provided`, () => {
        const longText = "a".repeat(162);
        render(<TweetAvailableChars currentTextContent={longText}/>);
        const chartsLeft = screen.getByText('0');
        expect(chartsLeft).toBeInTheDocument();
    });

    // Test de renderizado de un texto que excede los 162 caracteres
    it(`should show -8 characteres remaining if 170 caracteres string is provided`, () => {
        const excededText = "a".repeat(170);
        render(<TweetAvailableChars currentTextContent={excededText}/>);
        const chartsLeft = screen.getByText('-8');
        expect(chartsLeft).toBeInTheDocument();
    });
});