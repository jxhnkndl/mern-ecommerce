import { apiSlice } from "./apiSlice";
import { PRODUCTS_URL } from "../constants";

// This is injecting endpoints into the parent apiSlice
export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      // Endpoint to channel this query to
      query: () => ({ url: PRODUCTS_URL }),
      // How long should the data stay cache for after the component using it unmounts (in seconds)
      keepUnusedDataFor: 5
    }),
    getProductDetails: builder.query({
      query: (productId) => ({ 
        url: `${PRODUCTS_URL}/${productId}` 
      }),
      keepUnusedDataFor: 5
    })
  })
});

// Export getProducts as useGetProductsQuery from productsApiSlice in this design pattern
export const { useGetProductsQuery, useGetProductDetailsQuery } = productsApiSlice;