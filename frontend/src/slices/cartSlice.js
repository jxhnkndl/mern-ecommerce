// Since this slice of state will not require handling async API actions, use createSlice
// instead of apiSlice
import { createSlice } from '@reduxjs/toolkit';
import { updateCart } from '../utils/cartUtils';

// Cart state will be persisted in local storage so that selections persist visit to visit
// If there is a cart object in local storage, extract and parse it
// Otherwise set initial state to contain an empty cardItems array
// Set shipping address as empty object
// Set PayPal as the primary payment for now
const initialState = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : { cartItems: [], shippingAddress: [], paymentMethod: 'PayPal'};


const cartSlice = createSlice({
  name: 'cart',
  initialState,
  // These methods are exported in cartSlice.reducer
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;

      // Check if this item is already in the shopping cart
      const itemInCart = state.cartItems.find(
        (item) => item._id === newItem._id
      );

      // If item is already in cart, increase its quantity by returning the new item
      // Otherwise, simply add the new item to the cart
      if (itemInCart) {
        state.cartItems = state.cartItems.map((item) =>
          item._id === itemInCart._id ? newItem : item
        );

      } else {
        state.cartItems = [...state.cartItems, newItem];
      }

      // Calculate updated prices and return to screen/component
      return updateCart(state);
    },
    removeFromCart: (state, action) => {
      // Keep all items that don't match the id of the item to remove from the cart
      state.cartItems = state.cartItems.filter((item) => item._id !== action.payload);

      // Calculate updated prices and return to screen/component
      return updateCart(state);
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      localStorage.setItem('cart', JSON.stringify(state));
    }
  },
});

// Export actions from reducer methods
export const { addToCart, removeFromCart, saveShippingAddress } = cartSlice.actions;

// Reducer the cart slice reducer methods
export default cartSlice.reducer;
