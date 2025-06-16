import { useSelector } from "react-redux";
import { PokemonCard } from "../component/PokemonCard";
import { selectIsFavorites } from "../RTK/selector";

export default function Favorite() {
  // const pokemonList = useSelector((state) => state.pokemon.list);
  // const favoriteList = useSelector((state) => state.favorite.list);
  // console.log(favoriteList);

  // const favoritePokemons = pokemonList.filter((el) => {
  //   const result = favoriteList.includes(el.id);
  //   return result;
  // });

  // favoritePokemons 이 변하면 Favorite 이 리랜더링 발생하면서
  // PokemonCard 도 리랜더링 발생
  const favoritePokemons = useSelector(selectIsFavorites);

  return (
    <>
      {favoritePokemons.map((pokemon) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      ))}
    </>
  );
}
