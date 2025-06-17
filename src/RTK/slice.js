import { createSlice } from "@reduxjs/toolkit";
import { fetchPokemonList } from "./thunk";

export const pokemonSlice = createSlice({
  name: "pokemon",
  initialState: {
    list: [],
    loading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemonList.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPokemonList.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchPokemonList.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export const favoriteSlice = createSlice({
  name: "favorite",
  initialState: {
    list: [1, 2, 3],
  },
  reducers: {
    addToFavorite(state, action) {
      const id = action.payload;
      if (!state.list.includes(id)) {
        state.list.push(id);
      }
    },
    removeToFavorite(state, action) {
      const id = action.payload;
      state.list = state.list.filter((el) => el !== id);
    },
  },
});
