import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectIsFavoriteById } from "../RTK/selector";
import { favoriteSlice } from "../RTK/slice";

export const FavoriteButton = ({ id }) => {
  const dispatch = useDispatch();

  // 내가 누른 항목의 id 가 favoriteList 이라는 상태 배열안에 이미 포함되어있다면
  // true, 없다면 false
  const isFavorite = useSelector(selectIsFavoriteById(Number(id)));

  const handleFavorite = useCallback(
    (e) => {
      e.stopPropagation();
      if (isFavorite) {
        dispatch(favoriteSlice.actions.removeToFavorite(id));
      } else {
        dispatch(favoriteSlice.actions.addToFavorite(id));
      }
    },
    [dispatch, id, isFavorite]
  );

  return (
    <button onClick={handleFavorite} className={isFavorite ? "text-[red]" : ""}>
      {isFavorite ? "♥" : "♡"}
    </button>
  );
};
