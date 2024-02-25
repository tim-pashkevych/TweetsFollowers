import { configureStore } from "@reduxjs/toolkit"
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist"
import storage from "redux-persist/lib/storage"

import { usersReducer } from "./users/slice"
import { followersReducer } from "./followers/slice"
import { authReducer } from "./auth/slice"

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["userId"],
}

const persistedAuth = persistReducer(persistConfig, authReducer)

export const store = configureStore({
  reducer: {
    auth: persistedAuth,
    users: usersReducer,
    followers: followersReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  // devTools: import.meta.env.NODE_ENV !== "production",
})

export let persistor = persistStore(store)
