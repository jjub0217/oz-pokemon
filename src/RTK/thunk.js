import { createAsyncThunk } from "@reduxjs/toolkit";

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
    return pokeData;
  } catch (err) {
    console.error(`포켓몬 ID ${id} 가져오기 실패`, err);
    return null;
  }
};

export const fetchPokemonList = createAsyncThunk(
  "pokemon/getMultiplePokemonId",
  async (maxPokemonId) => {
    const pokemonIdArray = Array.from(
      { length: maxPokemonId },
      (_, i) => i + 1
    );
    const pokemonData = await Promise.all(
      pokemonIdArray.map((el) => getSinglePokemonData(el))
    );
    return pokemonData;
  }
);
