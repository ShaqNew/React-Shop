import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist, addToWishlist, addToBasket } from "../../redux/reducer";
import currencyFormatter from '../../util/currencyFormatter';
import "./plp.scss";
import { IItem } from "../../util/dataTypes";

const Plp = (props) => {

  const dispatch = useDispatch()

  const { wishlistItems } = useSelector((state:any) => state.wishlist);

  const isInWishlist = (id:number) =>{
    if(wishlistItems.some((item:IItem) => item.id === id))
      return true
    return false
  }

  const { list } = props;

  return (
    <div  className="products-container" data-testid="products-container">
      {list.map((product) => (
        <div key={product.id} className="plp" data-testid="plp">
          <div className="plp__name" data-testid="plp-name">{product.title}</div>
          <div className="plp__image" data-testid="plp-image">
            <img src={product.image} alt={product.description}></img>
          </div>
          <div className="plp__price" data-testid="plp-price">{currencyFormatter(product.price)}</div>
          <div className="plp__buttons">
            { isInWishlist(product.id) ?
              <button
                aria-label="remove from wishlist"
                className="removeFromWishlist"
                data-testid="plp-remove-from-wishlist"
                onClick={() => dispatch(removeFromWishlist(product.id))}
              >
                Wishlisted
              </button> 
              :
              <button
                aria-label="add to wishlist"
                className="button-with-text"
                data-testid="plp-add-to-wishlist"
                onClick={() => dispatch(addToWishlist(product))}
              >
                Add to wishlist
              </button>

            }
            <button
              aria-label="add to cart"
              className="button-with-text"
              data-testid="plp-add-to-basket"
              onClick={() => dispatch(addToBasket(product))}
            >
              Add to cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Plp;
