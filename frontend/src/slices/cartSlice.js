// Since this slice of state will not require handling async API actions, use createSlice
// instead of apiSlice
import { createSlice } from '@reduxjs/toolkit';

// Cart state will be persisted in local storage so that selections persist visit to visit
// If there is a cart object in local storage, extract and parse it
// Otherwise set initial state to contain an empty cardItems array
const initialState = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : { cartItems: [] };

// Convert prices to two decimal points
const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

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
          item._id === itemInCart._id ? itemInCart : item
        );
      } else {
        state.cartItems = [...state.cartItems, newItem];
      }

      // Calculate price of all items in cart (to two decimal points)
      state.itemsPrice = addDecimals(
        state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
      );

      // Calculate shipping price (if order is over $100 = free, otherwise shipping is $10)
      state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);

      // Calculate tax price (15% on all items)
      state.taxPrice = addDecimals(Number((0.15 * state.itemsPrice).toFixed(2)));

      // Calculate total price
      state.totalPrice = (
        Number(state.itemsPrice) +
        Number(state.shippingPrice) +
        Number(state.taxPrice)
      ).toFixed(2);

      // Save cart state to local storage
      localStorage.setItem('cart', JSON.stringify(state));
    },
  },
});

// Export actions from reducer methods
export const { addToCart } = cartSlice.actions;

// Reducer the cart slice reducer methods
export default cartSlice.reducer;
