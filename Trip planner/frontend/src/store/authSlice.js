import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  accessToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;  // Store user details
      state.accessToken = action.payload.accessToken;
    },
    logoutSuccess: (state) => {
      state.user = null;
      state.accessToken = null;
    },
  },
});

export const { loginSuccess, logoutSuccess } = authSlice.actions;
export default authSlice.reducer;
