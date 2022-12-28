import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import store from "./store";

export const slice = createSlice({
  name: "filters",
  initialState: {
    name: "",
    haveSeries: false,
    haveStories: false,
  },
  reducers: {
    changeName(state, { payload }: PayloadAction<string>) {
      return { ...state, name: payload };
    },
    changeHaveSeries(state, { payload }: PayloadAction<boolean>) {
      return { ...state, haveSeries: payload };
    },
    changeHaveStories(state, { payload }: PayloadAction<boolean>) {
      return { ...state, haveStories: payload };
    },
  },
});

export const { changeName, changeHaveSeries, changeHaveStories } =
  slice.actions;

export const selectName = (state: ReturnType<typeof store.getState>) =>
  state.filter.name;
export const selectHaveSeries = (state: ReturnType<typeof store.getState>) =>
  state.filter.haveSeries;
export const selectHaveStory = (state: ReturnType<typeof store.getState>) =>
  state.filter.haveStories;

export default slice.reducer;
