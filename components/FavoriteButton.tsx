import axios from "axios";
import React, { useCallback, useMemo } from "react";

import useCurrentUser from "@/hooks/useCurrentUser";
import useFavorites from "@/hooks/useFavorites";

import { AiOutlinePlus, AiOutlineCheck } from "react-icons/ai";

interface FavoriteButtonProps {
  movieId: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId }) => {
  const { mutate: mutateFavorites } = useFavorites();
  const { data: currentUser, mutate } = useCurrentUser();

  const isFavorite = useMemo(() => {
    if (!currentUser) return false;

    const list = currentUser.favoriteIds || [];

    return list.includes(movieId);
  }, [currentUser, movieId]);

  const Icon = isFavorite ? AiOutlineCheck : AiOutlinePlus;

  const toggleFavorite = useCallback(async () => {
    if (!currentUser) return;
    let response;

    if (isFavorite) {
      response = await axios.delete("api/favorite", {
        data: { movieId: movieId },
      });
    } else {
      response = await axios.post("api/favorite", { movieId: movieId });
    }

    const updatedFavoritesIds = response?.data?.favoriteIds;

    mutate({ ...currentUser, favorite: updatedFavoritesIds });
    mutateFavorites();
  }, [movieId, currentUser, isFavorite, mutate, mutateFavorites]);

  return (
    <div onClick={toggleFavorite} className="cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300">
      <Icon size={25} className="text-white" />
    </div>
  );
};

export default FavoriteButton;
