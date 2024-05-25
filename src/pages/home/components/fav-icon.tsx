/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAuthStore } from "@/store/client/useStore";
import {
  useAddFavourite,
  useDeleteFavourite,
} from "@/store/server/favourite/mutation";
import {
  IconHeart,
  IconHeartFilled,
  IconPlayerPlayFilled,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";

const FavIcon = ({
  song,
  handleSongClick,
  index,
}: {
  index: number;
  song: any;
  handleSongClick: (index: number) => void;
}) => {
  const addFav = useAddFavourite();
  const { auth } = useAuthStore();
  const deleteFav = useDeleteFavourite();

  const [fav, setFav] = useState<boolean>(() => {
    const favs = JSON.parse(localStorage.getItem("fav") || "{}");
    return favs[song.id] || false;
  });

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("fav") || "{}");
    favs[song.id] = fav;
    localStorage.setItem("fav", JSON.stringify(favs));
  }, [fav, song.id]);

  return (
    <>
      <IconPlayerPlayFilled
        size={30}
        onClick={() => handleSongClick(index)}
        className="bg-white p-1 cursor-pointer rounded-full text-red-500"
      />
      {auth && (
        <>
          {fav ? (
            <IconHeartFilled
              onClick={() => {
                deleteFav.mutate(Number(song.id), {
                  onSuccess: () => setFav(false),
                });
              }}
              size={30}
              className="bg-white p-1 cursor-pointer rounded-full text-red-500"
            />
          ) : (
            <IconHeart
              onClick={() => {
                addFav.mutate(
                  { music_id: Number(song.id) },
                  {
                    onSuccess: () => setFav(true),
                  }
                );
              }}
              size={30}
              className="bg-white p-1 cursor-pointer rounded-full text-red-500"
            />
          )}
        </>
      )}
    </>
  );
};

export default FavIcon;
