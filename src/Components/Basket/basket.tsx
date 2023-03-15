import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { emptyCart } from "../../redux/reducer";
import BasketItem from "./basketItem";
import "./basket.scss";
import { IItem } from "../../util/dataTypes";

const Basket = (props: {showBasket: boolean}) => {
  const { showBasket } = props;
  const { basketListItems } = useSelector((state:any) => state.basket)
  const [show, setShow] = useState("hidden");
  const [uniqueItems, setUniqueItems] = useState([])

  const dispatch = useDispatch()

  useEffect(() => {
    if (showBasket) {
      setShow("show");
    } else {
      setShow("hidden");
    }
  }, [showBasket]);

  useEffect(() => {
    assignBasketListQuantities()
  },[basketListItems])

  const assignBasketListQuantities = () => {
    let tempList = []
      for(let item of basketListItems) {
        if(!tempList.some((tempItem: { id: number; }) => tempItem.id === item.id)){
          tempList.push(item)
        }
      }
    setUniqueItems(tempList)
  }

  return (
    <>
      <div className={`basket basket--${show}`} data-testid="basket-container">
        <span className="basket-title">
          <h2> Basket </h2>
        </span>
        {!uniqueItems.length ? (
          <div className="nothing-text" data-testid="basket-empty">There's nothing here yet</div>
        ) : (
          <>
            <div className="basket__clear-all-button">
              <button
                aria-label="empty cart"
                className="button-with-text"
                data-testid="empty-basket-button"
                onClick={() => dispatch(emptyCart())}
              >
                Clear All
              </button>
            </div>

            {uniqueItems.map((item:IItem) => (
              <div key={item.id} className="basket__item-container" data-testid="basket-item-container">
                <BasketItem
                  item={item}
                />
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default Basket;
