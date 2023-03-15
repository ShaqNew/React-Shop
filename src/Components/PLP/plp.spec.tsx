import React from 'react';
import { fireEvent, render, screen } from "@testing-library/react";
import { useDispatch } from 'react-redux';
import { removeFromWishlist, addToWishlist, addToBasket } from "../../redux/reducer";
import * as reactRedux from 'react-redux';
import Plp from "./plp";
import { item, item2, item3, emptyWishlistState, emptyInitialState } from '../../util/testData'

jest.mock("react-redux");

describe("plp", () => {

    const fullTestList = [item, item2, item3]

    beforeEach(() => {
        jest.clearAllMocks();
    })

    it("renders 3 plps", () => {
        const useSelectorMock = jest.spyOn(reactRedux, 'useSelector');
        useSelectorMock.mockReturnValue(emptyWishlistState);
        render(<Plp list={fullTestList} />);
        const plpCards = screen.getAllByTestId("plp")

        expect(plpCards).toHaveLength(3)
    })

    it("adds an item to wishlist from plp", () => {
        const useSelectorMock = jest.spyOn(reactRedux, 'useSelector');
        useSelectorMock.mockReturnValue(emptyWishlistState);
        
        const mockDispatch = jest.fn();
        (useDispatch as jest.Mock).mockImplementation(() => mockDispatch);


        render(<Plp list={fullTestList} />);
        const plpWishlistButtons = screen.getAllByTestId("plp-add-to-wishlist")

        fireEvent.click(plpWishlistButtons[0])
        expect(mockDispatch).toBeCalledWith(addToWishlist(item))
    })

    it("removes an item from wishlist from plp", () => {
        const useSelectorMock = jest.spyOn(reactRedux, 'useSelector');
        useSelectorMock.mockReturnValue({wishlistItems: [item]});
        
        const mockDispatch = jest.fn();
        (useDispatch as jest.Mock).mockImplementation(() => mockDispatch);


        render(<Plp list={fullTestList} />);
        const plpWishlistButton = screen.getByTestId("plp-remove-from-wishlist")

        fireEvent.click(plpWishlistButton)
        expect(mockDispatch).toBeCalledWith(removeFromWishlist(item.id))
    })

    it("adds an item to basket from plp", () => {
        const useSelectorMock = jest.spyOn(reactRedux, 'useSelector');
        useSelectorMock.mockReturnValue(emptyInitialState);
        
        const mockDispatch = jest.fn();
        (useDispatch as jest.Mock).mockImplementation(() => mockDispatch);


        render(<Plp list={fullTestList} />);
        const plpBasketButtons = screen.getAllByTestId("plp-add-to-basket")

        fireEvent.click(plpBasketButtons[0])
        expect(mockDispatch).toBeCalledWith(addToBasket(item))
    })
})