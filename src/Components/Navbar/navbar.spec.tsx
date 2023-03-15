import React from "react";
import { render, screen } from "@testing-library/react";
import * as reactRedux from 'react-redux';
import Navbar from "./navbar";
import { emptyInitialState, loadedInitialState } from "../../util/testData";

jest.mock("react-redux");

describe("navbar", () => {
    
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("renders navbar with no counters", () => {
        const useSelectorMock  = jest.spyOn(reactRedux, 'useSelector');
        useSelectorMock.mockReturnValue(emptyInitialState);

        render(<Navbar />);

        expect(screen.queryByTestId("wishlist-counter")).not.toBeInTheDocument()
        expect(screen.queryByTestId("basket-counter")).not.toBeInTheDocument()
    })

    it("renders navbar with correct counters", () => {
        const useSelectorMock  = jest.spyOn(reactRedux, 'useSelector');
        useSelectorMock.mockReturnValue(loadedInitialState);

        render(<Navbar />);

        expect(screen.getByTestId("wishlist-counter")).toHaveTextContent("1")
        expect(screen.getByTestId("basket-counter")).toHaveTextContent("2")
    })
})