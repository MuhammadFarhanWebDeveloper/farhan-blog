import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice.js";
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/es/persistStore";
import postsReducer  from "./posts/postsSlice.js";
const rootReducers = combineReducers({
  user: userReducer,
  posts:postsReducer
});
const persistConfig = {
  key: "root",
  storage,
  version: 1,
};
export const store = configureStore({
  reducer: rootReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
