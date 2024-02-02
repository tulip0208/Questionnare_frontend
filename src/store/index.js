import { configureStore } from "@reduxjs/toolkit";
import user from "../features/userSlice";
import store from '../features/storeSlice'

const combinedReducer = {
  store,
  user
};

export default configureStore({
  reducer: combinedReducer,
});