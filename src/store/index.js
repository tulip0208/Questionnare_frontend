import { configureStore } from "@reduxjs/toolkit";
import user from "../features/userSlice";

const combinedReducer = {
  user
};

export default configureStore({
  reducer: combinedReducer,
});