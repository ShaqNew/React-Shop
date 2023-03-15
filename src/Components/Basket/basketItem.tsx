import React, { useEffect, useState } from "react";
import { addToBasket, removeFromBasket, removeSingleQuantity } from '../../redux/reducer'
import currencyFormatter from '../../util/currencyFormatter';
import "./basketItem.scss";
import  { useSelector, useDispatch } from "react-redux";
import { IItem } from "../../util/dataTypes";

const BasketItem = (props: { item: IItem; }) => {
  const { item } = props;
  const { title, image, price, id, description } = item;
  const { basketListItems } = useSelector((state:any) => state.basket)
  const [quantity, setquantity] = useState(1)

  const dispatch = useDispatch();

  const changeQuantity = (value: number) => {
    if(value > 0){
      dispatch(addToBasket(item))
    } else {
      if(quantity === 1) {
        dispatch(removeFromBasket(id))
      } else {
        dispatch(removeSingleQuantity(id))
      }
    }
  }

  const checkQuanitity = () => {
    const itemDuplicates = basketListItems.filter((itemCompared: { id: number; }) => {
      return itemCompared.id === id;
    }).length;
    setquantity(itemDuplicates)
  }

  useEffect(() => {
    checkQuanitity()
  },[basketListItems])

  let fullPrice = currencyFormatter(price * quantity)


  return (
      <div className="basketItem" data-testid="basket-item">
        <div className="basketItem__image">
          <img data-testid="basket-item-image" src={image} alt={description}></img>
        </div>
        <div className="basketItem__info">
          <div className="basketItem__title" data-testid="basket-item-name">{title}</div>
          <div className="basketItem__bottom">
            <div className="basketItem__quantity">
                <button
                  aria-label='reduce quantity'
                  className="basketItem__quantityModifier"
                  data-testid="basket-item-quantity-decrement"
                  onClick={() => changeQuantity(-1)}
                >
                  &mdash;
                </button>
                <input
                  className="basketItem__quantityNumber"
                  type="text"
                  data-testid="basket-item-quantity-value"
                  value={quantity}
                  readOnly
                />
                <button
                  aria-label='increase quantity'
                  className="basketItem__quantityModifier"
                  data-testid="basket-item-quantity-increment"
                  onClick={() => changeQuantity(1)}
                >
                  &#xff0b;
                </button>
            </div>
            <div className="basketItem__price" data-testid="basket-item-price">
                {fullPrice}
            </div>
          </div>
        </div>
        <div className="basketItem__right">
          <button onClick={() => dispatch(removeFromBasket(id))} className="icon-button" data-testid="basket-item-remove">
            <i aria-label='remove product' className="fa fa-2x fa-close basketItem__icon"/>
          </button>
        </div>
      </div>
  );
};

export default BasketItem;
