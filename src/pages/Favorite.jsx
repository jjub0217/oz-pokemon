import { useSelector } from "react-redux";
import { PokemonCard } from "../component/PokemonCard";
import { selectIsFavorites } from "../RTK/selector";

export default function Favorite() {
  const favoritePokemons = useSelector(selectIsFavorites);

  return (
    <>
      {favoritePokemons.map((pokemon) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      ))}
    </>
  );
}
