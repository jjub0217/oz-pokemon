// 우리가 따로 selector 를 정의해서, 우리가 원하는 정보만 불러올수 있도록 해준다.
import { createSelector } from "@reduxjs/toolkit";

// 상태로부터 파생된 데이터를 효율적으로 계산할수 잇도록 도와주는 메모이제이션
// const selectTotalPrice = createSelector(
//   [selectCartItems], // state 에서 필요한 값을 추출
// 이거의 결과가 변하지 않으면, selectTotalPrice은 다시 계산하지 않는다.

// 계산함수 : 위의 값을 받아서 파생 데이터를 계산
//   (items) => items.reduce((total, item) => total + item.price, 0)
// );

export const pokemon = (id) =>
  createSelector(
    // 내가 어떤 상태에서 일부만 가져올건지 작성

    // state 에서 pokemon 상태중에서 일부를 어떻게 가져올건지 함수로 작성해서 전달
    (state) => state.pokemon.list,
    (listes) => {
      console.log(listes);

      // console.log(listes.find((el) => el.id === id));

      const selectPokemon = listes.find((el) => el.id === id);
      // const result = listes.find((el) => el.id === id);
      return selectPokemon;
    }
  );

export const searchPokemon = (params) =>
  createSelector(
    // 내가 어떤 상태에서 일부만 가져올건지 작성

    // state 에서 pokemon 상태중에서 일부를 어떻게 가져올건지 함수로 작성해서 전달
    (state) => state.pokemon.list,
    (listes) => {
      // console.log(listes.find((el) => el.id === id));
      // console.log(params);

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
