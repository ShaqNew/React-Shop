import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { useDispatch } from "react-redux";
import * as reactRedux from 'react-redux';
import Basket from "./basket";
import { emptyCart } from "../../redux/reducer";
import { item, item2, emptyBasketState } from '../../util/testData'

jest.mock("react-redux");

describe("basket", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    })

    it("renders visible empty basket", () => {
        const useSelectorMock = jest.spyOn(reactRedux, 'useSelector')
        useSelectorMock.mockReturnValue(emptyBasketState);

        render(<Basket showBasket={true} />);
        const emptyMessage = screen.getByTestId("basket-empty");
        const container = screen.getByTestId("basket-container");

        expect(emptyMessage).toBeInTheDocument();
        expect(container).toHaveClass("basket--show")
    })
    
    it("renders basket item container", () => {
        const useSelectorMock = jest.spyOn(reactRedux, 'useSelector');
        useSelectorMock.mockReturnValue({basketListItems: [item]});

        render(<Basket showWishlist={true}/>)
        const itemContainer = screen.getByTestId("basket-item-container");
        expect(itemContainer).toBeInTheDocument()
    })

    it("renders hidden basket", () => {
        const useSelectorMock = jest.spyOn(reactRedux, 'useSelector');
        useSelectorMock.mockReturnValue(emptyBasketState);

        render(<Basket showWishlist={false}/>);
        const container = screen.getByTestId("basket-container");
        expect(container).toHaveClass("basket--hidden");
    });
    
    it("empties the basket when the clear button is pressed", () => {
        const mockDispatch = jest.fn();
        (useDispatch as jest.Mock).mockImplementation(() => mockDispatch);

        const useSelectorMock = jest.spyOn(reactRedux, 'useSelector');
        useSelectorMock.mockReturnValue({basketListItems: [item, item2]});

        render(<Basket showWishlist={true}/>);
        const itemContainers = screen.getAllByTestId("basket-item-container");
        expect(itemContainers).toHaveLength(2)

        const emptyBasketButton = screen.getByTestId("empty-basket-button");
        fireEvent.click(emptyBasketButton);

        expect(mockDispatch).toHaveBeenCalledWith(emptyCart())
    })

})