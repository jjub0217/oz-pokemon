import { getRegExp } from "korean-regexp";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { searchPokemon } from "../RTK/selector";
import { PokemonCard } from "../component/PokemonCard";
export default function Search() {
  // const location = useLocation();
  // console.log(location.search);
  const [searchparams] = useSearchParams();
  const params = searchparams.get("pokemon");

  // 이거랑 일치하는 문자열 패턴이 있는지 확인해주는 라이브러리
  const paramReg = useMemo(() => getRegExp(params), [params]);
  // console.log(paramReg);

  const searchedPokemon = useSelector(searchPokemon(paramReg));
  console.log(searchedPokemon);

  return (
    <>
      {searchedPokemon.map((pokemon) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      ))}
    </>
  );
}
