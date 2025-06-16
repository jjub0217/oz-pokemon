import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { pokemon } from "../RTK/selector";
import { fetchPokemonList } from "../RTK/thunk";
import { FavoriteButton } from "../component/FavoriteButton";
import FlipCard from "../component/FlipCard";

export default function Detail() {
  const { id } = useParams();
  console.log(id);
  const pokemonList = useSelector((state) => state.pokemon.list);
  const isLoading = useSelector((state) => state.pokemon.loading);

  // id 가, list 로 받아오는 거에서 같은지 걸러야 하는데, 좀 비효율적이다.
  // const { list: pokemonList } = useSelector((state) => state.pokemon);
  const dispatch = useDispatch();
  const selectedPokemon = useSelector(pokemon(Number(id)));

  useEffect(() => {
    if (pokemonList.length === 0) {
      dispatch(fetchPokemonList(151));
    }
  }, [dispatch, pokemonList]);

  if (isLoading || !selectedPokemon) {
    return <p>포켓몬 정보를 불러오는 중입니다...</p>;
  }

  return (
    <article
      className="flex flex-col justify-center items-center py-[30px] px-[60px] border border-black rounded-[10px]
    bg-white border-b-[8px] border-r-[8px] "
    >
      <h1 className="text-[28px] mb-[10px]">{selectedPokemon.name}</h1>
      <FavoriteButton id={selectedPokemon.id} />
      <p className="whitespace-pre-wrap text-center">
        {selectedPokemon.description}
      </p>
      <FlipCard front={selectedPokemon.front} back={selectedPokemon.back} />
      {/* <img
        src={selectedPokemon.front}
        alt={selectedPokemon.name}
        className="w-[200px]"
      /> */}
    </article>
  );
}
