import { Character } from "./../types/marvel-api-types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import store from "./store";

export const slice = createSlice({
  name: "characters",
  initialState: {
    favoriteCharacters: [] as Character[],
    topFive: [
      { id: "1", label: "Select your character:" },
      { id: "2", label: "Select your character:" },
      { id: "3", label: "Select your character:" },
      { id: "4", label: "Select your character:" },
      { id: "5", label: "Select your character:" },
    ] as { id: string; label: string }[],
  },
  reducers: {
    changeFavoriteCharacters(state, { payload }: PayloadAction<Character[]>) {
      return {
        ...state,
        favoriteCharacters: [...state.favoriteCharacters, ...payload],
      };
    },
    removeFromFavoriteCharacters(state, { payload }: PayloadAction<number>) {
      return {
        ...state,
        favoriteCharacters: state.favoriteCharacters.filter(
          (character) => character.id !== payload
        ),
      };
    },
    changeTopFive(
      state,
      { payload }: PayloadAction<{ id: string; label: string }[]>
    ) {
      return { ...state, topFive: payload };
    },
  },
});

export const {
  removeFromFavoriteCharacters,
  changeFavoriteCharacters,
  changeTopFive,
} = slice.actions;

export const selectFavoriteCharacters = (
  state: ReturnType<typeof store.getState>
) => state.characters.favoriteCharacters;
export const selectTopFive = (state: ReturnType<typeof store.getState>) =>
  state.characters.topFive;

export default slice.reducer;
