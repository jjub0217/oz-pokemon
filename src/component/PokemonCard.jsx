import { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { FavoriteButton } from "./FavoriteButton";

const CardContainer = styled.section`
  width: 150px;
  border: 1px solid gray;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding-bottom: 10px;
  border-radius: 10px;
  cursor: pointer;
  border-bottom: 5px solid black;
  border-right: 5px solid black;

  img {
    width: 120px;
  }
`;

export const PokemonCard = memo(({ pokemon }) => {
  console.log("card", pokemon.id);

  const [loaded, setLoaded] = useState(true);
  const navigate = useNavigate();

  const handleToDetail = () => {
    navigate(`/detail/${pokemon.id}`);
  };

  return (
    <CardContainer onClick={handleToDetail}>
      {loaded ? (
        <p className="w-[120px] h-[120px] leading-[120px] text-center">
          로딩 중...
        </p>
      ) : null}
      <img
        src={pokemon.front}
        alt={pokemon.name}
        className="w-[120px]"
        onLoad={() => setLoaded(false)}
        style={{ display: loaded ? "none" : "block" }}
      />
      <h2>{pokemon.name}</h2>
      <FavoriteButton id={pokemon.id} />
    </CardContainer>
  );
});
