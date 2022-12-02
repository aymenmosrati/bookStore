import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  logs: [],
};

const reportSlices = createSlice({
  name: "report",
  initialState,
  reducers: {
    logInsert: (state, action) => {
      state.logs.push(action.payload);
    },
  },
});

export const { logInsert } = reportSlices.actions;
export default reportSlices.reducer;
