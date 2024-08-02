import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  error: null,
  currentUser: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.isLoading = true;
      state.error = null;
    }, 
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    signInFail: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { signInStart, signInSuccess, signInFail,signOut } = userSlice.actions;
export default userSlice.reducer;
