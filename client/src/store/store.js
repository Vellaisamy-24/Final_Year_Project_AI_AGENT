import { configureStore } from "@reduxjs/toolkit";

import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userSlice from "./Features/UserSlice";
const persistConfig = (key) => ({ key, storage });
const persistUserSlice = persistReducer(
  persistConfig("userPersistStore"),
  userSlice
);
export const store = configureStore({
  reducer: {
    user: persistUserSlice,
  },
});

export const persistedReducer = persistStore(store);
