import { createSlice } from "@reduxjs/toolkit";
const mySlice = createSlice({
  name: "tickers",
  initialState: [],

  reducers: {
    setTickers(state, action) {
      return action.payload;
    },
  },
});

export const { setTickers } = mySlice.actions;
export default mySlice.reducer;
