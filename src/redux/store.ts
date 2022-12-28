import { configureStore } from "@reduxjs/toolkit";
import charactersSlice from "./charactersSlice";
import filterSlice from "./filterSlice";
import routesSlice from "./routesSlice";

export const store = configureStore({
  reducer: {
    characters: charactersSlice,
    filter: filterSlice,
    routes: routesSlice,
  },
});

export default store;
