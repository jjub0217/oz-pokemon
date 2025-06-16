import { lazy, Suspense, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import "./App.scss";
import { fetchPokemonList } from "./RTK/thunk";
// import Detail from "./pages/Detail";
// import Favorite from "./pages/Favorite";
// import Main from "./pages/Main";
// import Search from "./pages/Search";

const Detail = lazy(() => import("./pages/Detail"));
const Favorite = lazy(() => import("./pages/Favorite"));
const Main = lazy(() => import("./pages/Main"));
const Search = lazy(() => import("./pages/Search"));

function App() {
  // 정보를 어떻게 쏙쏙 빼와서 우리에게 필요한 데이터로 가공을 할지부터 데이터 처리하면서 확인

  // App 은 처음 랜더링 될때  데이터를 받아와서 상태를 업데이트 하는 기능만 하도록 하자.
  const dispatch = useDispatch();
  // const {
  //   list: pokemonList,
  //   loading,
  //   error,
  // } = useSelector((state) => state.pokemon);

  // const isLoading = useSelector((state) => state.pokemon.loading);
  // const [pokemonList, setPokemonList] = useState([]);

  // const getSinglePokemonData = async (id) => {
  //   try {
  //     const res = await fetch(
  //       `https://pokeapi.co/api/v2/pokemon-species/${id}/`
  //     );
  //     const data = await res.json();

  //     const pokeData = {
  //       id,
  //       name: data.names.find((el) => el.language.name === "ko").name,
  //       description: data.flavor_text_entries.find(
  //         (el) => el.language.name === "ko"
  //       ).flavor_text,
  //       front: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
  //       back: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${id}.png`,
  //     };
  //     console.log(pokeData);
  //     return pokeData;
  //   } catch (err) {
  //     console.error(`포켓몬 ID ${id} 가져오기 실패`, err);
  //     return null; // 실패 시 null 반환
  //   }
  // };

  // 이름, 이미지(앞, 뒤), 설명
  // const getData = async () => {
  //   setIsLoading(true);
  //   try {
  //     // const res = await fetch("https://pokeapi.co/api/v2/pokemon-species/1/");
  //     // const data = await res.json();
  //     // console.log(data);
  //     // console.log(data.names.find((el) => el.language.name === "ko").name);
  //     // console.log(
  //     //   data.flavor_text_entries.find((el) => el.language.name === "ko")
  //     //     .flavor_text
  //     // );

  //     // Promise.all([promise1, promise2, ...promise151]) // [이상해씨, 이상해풀, ...뮤]

  //     // Array.from({ length: 151 }, (_, i) => i + 1); // [ 1, 2, 3, ... 151]
  //     // const pokemonIdArray = Array.from({ length: 151 }, (_, i) => i + 1);
  //     // const pokemonData = await Promise.all(
  //     //   pokemonIdArray.map(getSinglePokemonData)
  //     // );

  //     setPokemonList(pokemonData);
  //   } catch (err) {
  //     console.log(err);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   getData();
  // }, []);

  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // dispatch(pokemonSlice.actions.setIsLoading(true));
    // 자동으로 pending/fulfilled/rejected 처리됨
    dispatch(fetchPokemonList(151));

    // .then((res) => {
    //   // console.log(res);
    //   // console.log(res.payload);
    //   dispatch(pokemonSlice.actions.setPokemonList(res.payload));
    // })
    // .finally(() => {
    //   dispatch(pokemonSlice.actions.setIsLoading(false));
    // });
  }, [dispatch]);

  const handleSearch = (e) => {
    setInputValue(e.target.value);
    navigate(`/search?pokemon=${e.target.value}`);
  };
  return (
    <>
      <h1
        className="text-[40px] text-center border-t-[50px] border-t-[red]
      bg-[#000] text-[#fff]"
      >
        포켓몬 도감
      </h1>
      <nav className="py-[10px] border-b-[3px] border-b-black flex gap-[20px] justify-center">
        <Link to={`/`}>메인</Link>
        <Link to={`/favorite`}>찜목록</Link>
        <div>
          <label htmlFor="search" className="sr-only">
            검색
          </label>
          <input
            id="search"
            type="text"
            className="w-[120px] border-b border-[gray] px-2"
            onChange={handleSearch}
            value={inputValue}
          />
          <span>🔎</span>
        </div>
      </nav>
      <main
        className="flex justify-center flex-wrap gap-[20px] pt-[20px]
      bg-[gray] pb-[20px]"
      >
        <Suspense fallback={<p>로딩 중...</p>}>
          <Routes>
            <Route path={`/`} element={<Main />} />
            <Route path={`/detail/:id`} element={<Detail />} />
            <Route path={`/search`} element={<Search />} />
            <Route path={`/favorite`} element={<Favorite />} />
          </Routes>
        </Suspense>
      </main>

      {/* {isLoading ? (
        <p>로딩 중...</p>
      ) : (
        <ul>
          {pokemonList.map((pokemon) => (
            <li key={pokemon.id}>
              <h3>{pokemon.name}</h3>
              <img src={pokemon.front} alt={pokemon.name} />
              <p>{pokemon.description}</p>
            </li>
          ))}
        </ul>
      )} */}
    </>
  );
}

export default App;
