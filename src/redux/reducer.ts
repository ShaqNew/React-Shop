import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IItem, IState } from '../util/dataTypes'


export const reducerSlice = createSlice({
  name: 'reducer',
  initialState: {
    wishlistItems: [],
    basketListItems: []
  },
  reducers: {
    addToWishlist: (state: IState, action: PayloadAction<IItem>) => {
        let tempWishlist = state.wishlistItems;
        if (!tempWishlist.some((obj) => obj.id === action.payload.id))
            state.wishlistItems = [...tempWishlist, action.payload]
    },
    addToBasket: (state: IState, action: PayloadAction<IItem>) => {
        

        let tempBasket = state.basketListItems;
            state.basketListItems = [...tempBasket, action.payload]
    },
    removeFromWishlist: (state: IState, action) => {
    let filtered = state.wishlistItems.filter((obj) => {
        return obj.id !== action.payload;
      });
      state.wishlistItems = filtered
    },
    removeFromBasket: (state: IState, action) =>  {
        let filtered = state.basketListItems.filter((obj) => {
          return obj.id !== action.payload;
        });
        state.basketListItems = filtered
    },
    removeSingleQuantity: (state: IState, action) => {
      let index
      for(const item of state.basketListItems){
        if(item.id === action.payload){
          index = state.basketListItems.indexOf(item);
          state.basketListItems.splice(index, 1);
          return
        }
      }
    },
    emptyCart: (state) => {
        state.basketListItems = []
    }
  }
})

export const { addToWishlist, addToBasket, removeFromWishlist, removeFromBasket, removeSingleQuantity, emptyCart } = reducerSlice.actions

export default reducerSlice.reducer