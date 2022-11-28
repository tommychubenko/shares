import { configureStore } from "@reduxjs/toolkit";
import shares from "./slice";

export const store = configureStore({
  reducer: shares,
});
