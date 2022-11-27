import { configureStore, createSlice } from "@reduxjs/toolkit";

const mySlice = createSlice({
  name: "tickers",
  initialState: [],

  reducers: {
    setTickers(state, action) {
      return action.payload;
    },
  },
});

export const store = configureStore({
  reducer: { tickers: mySlice.reducer },
});

export const { setTickers } = mySlice.actions;
