import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { useDispatch } from "react-redux";
import * as reactRedux from 'react-redux';
import BasketItem from "./basketItem";
import { addToBasket } from "../../redux/reducer";
import { LargerloadedInitialState, loadedInitialState, item2 } from "../../util/testData";

jest.mock("react-redux");

describe("BasketItem", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders basket item", () => {
    const useSelectorMock = jest.spyOn(reactRedux, 'useSelector')
    useSelectorMock.mockReturnValue(loadedInitialState);
    render(<BasketItem item={item2} />);

    const itemTitle = screen.getByTestId("basket-item-name");
    const itemImage = screen.getByTestId("basket-item-image");
    const itemPrice = screen.getByTestId("basket-item-price");
    const itemRemove = screen.getByTestId("basket-item-remove");

    expect(itemTitle).toHaveTextContent('item 2');
    expect(itemImage).toHaveAttribute("alt", "description");
    expect(itemPrice).toHaveTextContent("£10.00");
    expect(itemRemove).toBeInTheDocument();
  });

  describe("increase quantity button - reducer/addToBasket", () => {
    it("should call dispatch", () => {
      const mockDispatch = jest.fn();
      (useDispatch as jest.Mock).mockImplementation(() => mockDispatch);
      const useSelectorMock = jest.spyOn(reactRedux, 'useSelector')
      useSelectorMock.mockReturnValue(loadedInitialState);

      render(<BasketItem item={item2} />);
      fireEvent.click(screen.getByTestId("basket-item-quantity-increment"));
      expect(mockDispatch).toHaveBeenCalledWith(addToBasket(item2));
    });
  });

  describe("decrease quantity button - reducer/removeSingleQuantity", () => {
    it("should call dispatch", () => {
      const mockDispatch = jest.fn();
      (useDispatch as jest.Mock).mockImplementation(() => mockDispatch);
      const useSelectorMock = jest.spyOn(reactRedux, 'useSelector')
      useSelectorMock.mockReturnValue(LargerloadedInitialState);

      render(<BasketItem item={item2} />);
      fireEvent.click(screen.getByTestId("basket-item-quantity-decrement"));
      expect(mockDispatch).toHaveBeenCalledWith({
        payload: 2,
        type: "reducer/removeSingleQuantity",
      });
    });
  });

  describe("removed item if remove button clicked - reducer/removeFromBasket", () => {
    it("should call dispatch", () => {
      const mockDispatch = jest.fn();
      (useDispatch as jest.Mock).mockImplementation(() => mockDispatch);
      const useSelectorMock = jest.spyOn(reactRedux, 'useSelector')
      useSelectorMock.mockReturnValue(loadedInitialState);

      render(<BasketItem item={item2} />);
      fireEvent.click(screen.getByTestId("basket-item-remove"));
      expect(mockDispatch).toHaveBeenCalledWith({
        payload: 2,
        type: "reducer/removeFromBasket",
      });
    });
  });

  describe("removed item if empty - reducer/removeFromBasket", () => {
    it("should remove item when quantity is lowered to 0", () => {
      const mockDispatch = jest.fn();
      (useDispatch as jest.Mock).mockImplementation(() => mockDispatch);
      const useSelectorMock = jest.spyOn(reactRedux, 'useSelector')
      useSelectorMock.mockReturnValue(loadedInitialState);

      render(<BasketItem item={item2} />);
      fireEvent.click(screen.getByTestId("basket-item-quantity-decrement"));
      expect(mockDispatch).toHaveBeenCalledWith({
        payload: 2,
        type: "reducer/removeFromBasket",
      });
    });
  });
});
