import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { useDispatch, useSelector, Provider } from "react-redux";
import WishlistItem from './wishlistItem'
import { removeFromWishlist, addToBasket } from "../../redux/reducer";

// jest.mock("react-redux",  () => ({
//     useDispatch: jest.fn()
// }))

jest.mock("react-redux");

describe("WishlistItem", () => {
    const item = {
        title: "item 1",
        image: "image.jpg",
        price: 10,
        id: 1,
        description: "description",
      };

      beforeEach(() => {
        jest.clearAllMocks();
      });

      it("renders wishlist item", () => {
        render(<WishlistItem item={item} />);

        const itemTitle = screen.getByTestId("wishlist-item-name");
        const itemImage = screen.getByTestId("wishlist-item-image");
        const itemPrice = screen.getByTestId("wishlist-item-price");
        const itemRemove = screen.getByTestId("wishlist-item-remove");
    
        expect(itemTitle).toHaveTextContent('item 1');
        expect(itemImage).toHaveAttribute("alt", "description");
        expect(itemPrice).toHaveTextContent("£10.00");
        expect(itemRemove).toBeInTheDocument();
      })

      it("removes wishlist item when remove button is clicked", () => {
        const mockDispatch = jest.fn();
        (useDispatch as jest.Mock).mockImplementation(() => mockDispatch);

        render(<WishlistItem item={item} />);
        fireEvent.click(screen.getByTestId("wishlist-item-remove"));
        expect(mockDispatch).toHaveBeenCalledWith(removeFromWishlist(item.id));
      })

      it("add to to basket - add to basket button - reducer/addToBasket", () => {
        const mockDispatch = jest.fn();
        (useDispatch as jest.Mock).mockImplementation(() => mockDispatch);

        render(<WishlistItem item={item} />);
        fireEvent.click(screen.getByTestId("wishlist-item-cart"));
        expect(mockDispatch).toHaveBeenCalledWith(addToBasket(item));
      })
})