import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import WishlistItem from "./wishlistItem";
import "./wishlist.scss";
import { IItem } from "../../util/dataTypes";

const Wishlist = (props) => {
  const { showWishlist } = props;
  const { wishlistItems } = useSelector((state:any) => state.wishlist)
  const [show, setShow] = useState("hidden");

  useEffect(() => {
    if (showWishlist === true) {
      setShow("show");
    } else {
      setShow("hidden");
    }
  }, [showWishlist]);

  return (
    <div className={`wishlist wishlist--${show}`} data-testid="wishlist-container">
      <span className="wishlist-title">
        <h2>Wishlist</h2>
      </span>
      {!wishlistItems.length ? (
        <div className="nothing-text" data-testid="wishlist-empty">There's nothing here yet</div>
      ) : (
        wishlistItems.map((item:IItem) => (
          <div key={item.id} className="wishlist__item-container" data-testid="wishlist-item-container">
            <WishlistItem
              item={item}
            />
          </div>
        ))
      )}
    </div>
  );
};

export default Wishlist;
