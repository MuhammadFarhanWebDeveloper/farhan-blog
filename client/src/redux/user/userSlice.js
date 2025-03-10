import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isUserLoading:true,
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
    signOut:(state)=>{
      state.currentUser= null
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
    userLoading:(state, action)=>{
      state.isUserLoading = action.payload
    }
  },
});

export const { signInStart,signOut, signInSuccess, signInFail, userLoading } = userSlice.actions;
export default userSlice.reducer;
