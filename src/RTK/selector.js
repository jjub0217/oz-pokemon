import { createSelector } from "@reduxjs/toolkit";

export const pokemon = (id) =>
  createSelector(
    (state) => state.pokemon.list,
    (listes) => {
      const selectPokemon = listes.find((el) => el.id === id);
      return selectPokemon;
    }
  );

export const searchPokemon = (params) =>
  createSelector(
    (state) => state.pokemon.list,
    (listes) => {
      const result = listes.filter((el) => el.name.match(params));
      return result;
    }
  );

export const selectIsFavoriteById = (id) =>
  createSelector(
    (state) => state.favorite.list,
    (list) => list.includes(id)
  );

export const selectIsFavorites = createSelector(
  [(state) => state.pokemon.list, (state) => state.favorite.list],
  (pokemon, favorite) => {
    return pokemon.filter((el) => favorite.includes(el.id));
  }
);
