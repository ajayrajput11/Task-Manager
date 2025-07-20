import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import authReducer from "../features/authSlice"
import taskReducer from "../features/taskSlice"
import searchReducer from "../features/searchSlice"

const rootReducer = combineReducers({
  auth: authReducer,
  tasks: taskReducer,
  search: searchReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "tasks"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const Store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(Store)

export default Store;
