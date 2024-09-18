// createApi is used to define endpoints for a back end API and handle data fetching
// fetchBaseQuery is used make requests to the back end API with built in caching, retries, and base URL
// management

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../constants';

// Set up base API request query (base URL)
const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

export const apiSlice = createApi({
  // The base query contains the base URL that API requests will be sent through
  baseQuery,
  // Tag types define the type of data that's being fetched from the API
  // This is also used to invalidate cache and force a refetch for these asset types
  tagTypes: ['Product', 'Order', 'User'],
  // API endpoints that perform server side operations
  endpoints: (builder) => ({})
});

