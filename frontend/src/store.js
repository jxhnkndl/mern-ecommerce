import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apiSlice";
import cartSliceReducer from "./slices/cartSlice";
import authSliceReducer from './slices/authSlice';

// Configure Redux store
const store = configureStore({
  reducer: {
    // Bring in the reducer from the apiSlice as the slice's reducer path
    [apiSlice.reducerPath]: apiSlice.reducer,
    // Bring in reducers from other slices of state
    cart: cartSliceReducer,
    auth: authSliceReducer
  },
  // Get the store's default middleware and concatenate the apiSlice's middleware onto it
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  // Activate Redux dev tools
  devTools: true
});

export default store;