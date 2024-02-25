import { ADD_TO_CART, CLEAR_CART, REMOVE_FROM_CART } from "../constants/actionTypes";

const cartReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TO_CART:
      // Check if the product is already in the cart
      const existingProduct = state.find(item => item.id === action.payload.id);

      if (existingProduct) {
        // If the product is already in the cart, update the quantity or perform any other logic
        // For simplicity, let's assume we are updating the quantity
        return state.map(item =>
          item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // If the product is not in the cart, add it
        return [...state, { ...action.payload, quantity: 1 }];
      }

    case REMOVE_FROM_CART:
      return state.filter(item => item.id !== action.payload);

    case CLEAR_CART:
      return [];

    default:
      return state;
  }
};

export default cartReducer;
