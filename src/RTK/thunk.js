import { createAsyncThunk } from "@reduxjs/toolkit";

// export const pokemonSlice = createSlice({
//   name: "pokemon",
//   initialState: {
//     list: [],
//     loading: false,
//   },
//   reducers: {
//     setPokemonList(state, action) {
//       // console.log(action.payload);

//       state.list = action.payload;
//       console.log(state.list);
//     },
//     setIsLoading(state, action) {
//       // console.log(action);
//       // console.log(action.payload);
//       state.loading = action.payload;
//     },
//   },
// });

const getSinglePokemonData = async (id) => {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}/`);
    const data = await res.json();

    const pokeData = {
      id,
      name: data.names.find((el) => el.language.name === "ko").name,
      description: data.flavor_text_entries.find(
        (el) => el.language.name === "ko"
      ).flavor_text,
      front: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
      back: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${id}.png`,
    };
    // console.log(pokeData);
    return pokeData;
  } catch (err) {
    console.error(`포켓몬 ID ${id} 가져오기 실패`, err);
    return null; // 실패 시 null 반환
  }
};

export const fetchPokemonList = createAsyncThunk(
  "pokemon/getMultiplePokemonId",
  // 이 Thunk 를 실행시키면 이런 처리를 해줄것이다.
  async (
    maxPokemonId
    //  { dispatch }
  ) => {
    // dispatch(pokemonSlice.actions.setIsLoading(true));
    const pokemonIdArray = Array.from(
      { length: maxPokemonId },
      (_, i) => i + 1
    );
    const pokemonData = await Promise.all(
      pokemonIdArray.map((el) => getSinglePokemonData(el))
    );
    // dispatch(pokemonSlice.actions.setPokemonList(pokemonData));
    // dispatch(pokemonSlice.actions.setIsLoading(false));
    return pokemonData;
  }
);
