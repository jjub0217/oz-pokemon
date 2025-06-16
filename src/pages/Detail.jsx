import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { pokemon } from "../RTK/selector";

export default function Detail() {
  const { id } = useParams();

  // id 가, list 로 받아오는 거에서 같은지 걸러야 하는데, 좀 비효율적이다.
  // const { list: pokemonList } = useSelector((state) => state.pokemon);

  const selectedPokemon = useSelector(pokemon(Number(id)));
  console.log(selectedPokemon);

  return (
    <div className="flex flex-col justify-center items-center p-[30px] border border-[gray] rounded-[10px]">
      <h1 className="text-[28px] mb-[10px]">{selectedPokemon.name}</h1>
      <div className="whitespace-pre-wrap text-center">
        {selectedPokemon.description}
      </div>
      <img
        src={selectedPokemon.front}
        alt={selectedPokemon.name}
        className="w-[200px]"
      />
      <button>뒤집기</button>
    </div>
  );
}
