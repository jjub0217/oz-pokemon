import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

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
  /* border-bottom: 5px solid black;
  border-right: 5px solid black; */

  img {
    width: 120px;
  }
`;

export const PokemonCard = ({ pokemon }) => {
  const navigate = useNavigate();
  console.log(pokemon.id);

  const handleToDetail = () => {
    navigate(`/detail/${pokemon.id}`);
  };
  return (
    <CardContainer onClick={handleToDetail}>
      <img src={pokemon.front} alt={pokemon.name} className="w-[120px]" />
      <div>{pokemon.name}</div>
    </CardContainer>
  );
};
