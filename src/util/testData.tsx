export const item = {
    title: "item 1",
    image: "image.jpg",
    price: 10,
    id: 1,
    description: "description"
};

export const item2 = {
    title: "item 2",
    image: "image.jpg",
    price: 10,
    id: 2,
    description: "description"
};

export const item3 = {
    title: "item 3",
    image: "image.jpg",
    price: 10,
    id: 3,
    description: "description"
};

export const emptyBasketState = {
    basketListItems: []
}
export const emptyWishlistState = {
    wishlistItems: []
}

export const emptyInitialState = {
    wishlistItems: [],
    basketListItems: []
  }

export const loadedInitialState = {
    wishlistItems: [item],
    basketListItems: [item2, item3]
}
export const LargerloadedInitialState = {
    wishlistItems: [item, item2],
    basketListItems: [item2, item3, item2]
}