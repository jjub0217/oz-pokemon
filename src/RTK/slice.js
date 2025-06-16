import { createSlice } from "@reduxjs/toolkit";
import { fetchPokemonList } from "./thunk";

export const pokemonSlice = createSlice({
  name: "pokemon",
  initialState: {
    list: [],
    loading: false,
  },
  // 동기적으로 상태를 변경하는 것이 reducers
  // reducers: {
  //   setPokemonList(state, action) {
  //     state.list = action.payload;
  //     console.log(state.list);
  //   },
  //   setIsLoading(state, action) {
  //     state.loading = action.payload;
  //   },
  // },
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
}); // => action 도 만들어진거고, reducer 도 만들어진거다.
