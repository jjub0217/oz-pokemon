import { getRegExp } from "korean-regexp";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { searchPokemon } from "../RTK/selector";
import { PokemonCard } from "../component/PokemonCard";
export default function Search() {
  const [searchparams] = useSearchParams();
  const params = searchparams.get("pokemon");
  const paramReg = useMemo(() => getRegExp(params), [params]);
  const searchedPokemon = useSelector(searchPokemon(paramReg));

  return (
    <>
      {searchedPokemon.map((pokemon) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      ))}
    </>
  );
}
