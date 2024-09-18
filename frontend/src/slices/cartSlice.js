// Since this slice of state will not require handling async API actions, use createSlice
// instead of apiSlice
import { createSlice } from '@reduxjs/toolkit';

// Cart state will be persisted in local storage so that selections persist visit to visit
// If there is a cart object in local storage, extract and parse it
// Otherwise set initial state to contain an empty cardItems array
const initialState = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : { cardItems: [] };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
});

// Reducer the cart slice reducer methods
export default cartSlice.reducer;