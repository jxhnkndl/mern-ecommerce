// Use createSlice since this slice will not make any API calls
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      // Set user info payload to user info state and pass into local storage
      state.userInfo = action.payload;
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
    },
  },
});

// Export actions from reducer methods
export const { setCredentials } = authSlice.actions;

// Export reducer
export default authSlice.reducer;