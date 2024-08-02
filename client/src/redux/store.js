import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice.js";
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/es/persistStore";
import themeReducer from "./theme/themeSlice.js";
const rootReducers = combineReducers({
  user: userReducer,
  theme: themeReducer,
});
const persistConfig = {
  key: "root",
  storage,
  version: 1,
};
// const persistedReducers = persistReducer(persistConfig, rootReducers);
export const store = configureStore({
  reducer: rootReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
