import React from "react";
import { render, screen } from "@testing-library/react";
import * as reactRedux from 'react-redux';
import Wishlist from "./wishlist";
import { item, emptyWishlistState } from "../../util/testData";

jest.mock("react-redux");

describe("wishlist", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("renders visible empty wishlist", () => {
        const useSelectorMock = jest.spyOn(reactRedux, 'useSelector');
        useSelectorMock.mockReturnValue(emptyWishlistState);

        render(<Wishlist showWishlist={true}/>);
        const emptyMessage = screen.getByTestId("wishlist-empty");
        const container = screen.getByTestId("wishlist-container");

        expect(emptyMessage).toBeInTheDocument();
        expect(container).toHaveClass("wishlist--show");
    });
    
    it("renders wishlist item container", () => {
        const useSelectorMock = jest.spyOn(reactRedux, 'useSelector');
        useSelectorMock.mockReturnValue({wishlistItems: [item]});

        render(<Wishlist showWishlist={true}/>)
        const itemContainer = screen.getByTestId("wishlist-item-container");
        expect(itemContainer).toBeInTheDocument()
    })

    it("renders hidden wishlist", () => {
        const useSelectorMock = jest.spyOn(reactRedux, 'useSelector');
        useSelectorMock.mockReturnValue(emptyWishlistState);

        render(<Wishlist showWishlist={false}/>);
        const container = screen.getByTestId("wishlist-container");
        expect(container).toHaveClass("wishlist--hidden");
    });
})