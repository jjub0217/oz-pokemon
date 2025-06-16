import { useSelector } from "react-redux";
import { PokemonCard } from "../component/PokemonCard";

export default function Main() {
  const { list: pokemonList } = useSelector((state) => state.pokemon);
  const isLoading = useSelector((state) => state.pokemon.loading);

  return (
    <>
      {isLoading ? (
        <p>로딩 중...</p>
      ) : (
        <>
          {pokemonList.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </>
      )}
    </>
  );
}
