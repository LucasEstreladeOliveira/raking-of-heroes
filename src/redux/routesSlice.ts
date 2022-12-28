import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import store from "./store";

export const slice = createSlice({
  name: "routes",
  initialState: {
    currentRoute: "home",
  },
  reducers: {
    changeRoute(state, { payload }: PayloadAction<"home" | "ranking">) {
      return { ...state, currentRoute: payload };
    },
  },
});

export const { changeRoute } = slice.actions;

export const selectCurrentRoute = (state: ReturnType<typeof store.getState>) =>
  state.routes.currentRoute;

export default slice.reducer;
