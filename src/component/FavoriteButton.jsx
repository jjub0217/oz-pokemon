import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectIsFavoriteById } from "../RTK/selector";
import { favoriteSlice } from "../RTK/slice";

export const FavoriteButton = ({ id }) => {
  const dispatch = useDispatch();
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
