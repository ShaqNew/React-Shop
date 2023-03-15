import React from "react";
import { useDispatch } from "react-redux";
import { removeFromWishlist, addToBasket } from "../../redux/reducer";
import currencyFormatter from '../../util/currencyFormatter';
import "./wishlistItem.scss";
import { IItem } from "../../util/dataTypes";

const WishlistItem = (props: { item: IItem; }) => {
  const { item } = props;
  const { title, image, price, id, description } = item;

  const dispatch = useDispatch()

  return (
    <div className="wishlistItem">
      <div className="wishlistItem__image">
        <img data-testid="wishlist-item-image" src={image} alt={description}></img>
      </div>
      <div className="wishlistItem__info">
        <div className="wishlistItem__title" data-testid="wishlist-item-name">{title}</div>
        <div className="wishlistItem__price" data-testid="wishlist-item-price">{currencyFormatter(price)}</div>
      </div>
      <div className="wishlistItem__right">
        <button onClick={() => dispatch(removeFromWishlist(id))} className="icon-button" data-testid="wishlist-item-remove">
          <i
            aria-label="remove product"
            className="fa fa-2x fa-close wishlistItem__icon"
          />
        </button>
        <button onClick={() => dispatch(addToBasket(item))} className="icon-button" data-testid="wishlist-item-cart">
          <i
            aria-label="shopping cart"
            className="fa fa-2x fa-shopping-cart wishlistItem__icon"
          />
        </button>
      </div>
    </div>
  );
};

export default WishlistItem;
