import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Wishlist from "../Wishlist/wishlist";
import Basket from "../Basket/basket";
import "./navbar.scss";

const Navbar = () => {
  const [showWishlist, setShowWishlist] = useState(false);
  const [showBasket, setShowBasket] = useState(false);

  const { wishlistItems, basketListItems } = useSelector(
    (state:any) => state.wishlist
  );

  const displayWishlist = () => {
    setShowWishlist(!showWishlist);
  };
  const displayBasket = () => {
    setShowBasket(!showBasket);
  };

  const outSideModalClick = () => {
    const handleClickOutside = (event) => {
      const wishlistElem = document.getElementsByClassName("wishlist")[0];
      const basketElem = document.getElementsByClassName("basket")[0];
      if (!wishlistElem.contains(event.target)) {
        setShowWishlist(false);
      }
      if (!basketElem.contains(event.target)) {
        setShowBasket(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  };

  useEffect(() => {
    outSideModalClick();
  }, []);

  return (
    <header className="heading"  data-testid="header">
      <h1>Basic React Checkpoint</h1>
      <span className="heading__topButtons">
        <div className="heading__wishlistButton">
          <button onClick={() => displayWishlist()} className="icon-button" data-testid="wishlist-button">
            <i
              aria-label="wish list"
              className="fa fa-2x fa-heart heading__headingIcon"
            />
          </button>
          {wishlistItems.length ? (
            <div className="heading__iconCounter" data-testid="wishlist-counter">{wishlistItems.length}</div>
          ) : null}
        </div>
        <div className="heading__basketButton">
          <button onClick={() => displayBasket()} className="icon-button" data-testid="basket-button">
            <i
              aria-label="shopping cart"
              className="fa fa-2x fa-shopping-cart heading__headingIcon"
            />
          </button>
          {basketListItems.length ? (
            <div className="heading__iconCounter" data-testid="basket-counter">{basketListItems.length}</div>
          ) : null}
        </div>
      </span>
      <Wishlist showWishlist={showWishlist} />
      <Basket showBasket={showBasket} />
    </header>
  );
};

export default Navbar;
