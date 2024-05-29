/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAuthStore } from "@/store/client/useStore";
import { useState } from "react";
import Auth from "../auth/auth";
import { Button } from "@/components/ui/button";
import { useFavouriteList } from "@/store/server/favourite/query";
import MusicPlayer from "@/components/playmusic";

const Favourite = () => {
  const { auth } = useAuthStore();

  const [currentSongIndex, setCurrentSongIndex] = useState(0); //global state
  const [isPlaying, setIsPlaying] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(auth ? false : true);

  const { data } = useFavouriteList();

  const handleSongClick = (idx: number) => {
    setCurrentSongIndex(idx);
    setIsPlaying(true);
    setOpen(true);
  };

  const playNext = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % data?.data.length);
  };

  const playPrev = () => {
    if (data?.data)
      setCurrentSongIndex((prevIndex) => (prevIndex - 1) % data?.data.length);
  };

  console.log(currentSongIndex);

  return (
    <>
      <Auth open={modalOpen} setOpen={setModalOpen} />
      {!auth ? (
        <div className=" flex items-center justify-center h-[80vh]">
          <div className=" flex items-center flex-col gap-5">
            <p className=" font-bold text-center text-white">
              If you went to see favourite list, Please{" "}
            </p>
            <Button
              style={{ borderRadius: 15 }}
              size={"sm"}
              onClick={() => setModalOpen(!modalOpen)}
              className=" px-5 hover:bg-red-700  text-white bg-red-600 py-2 "
            >
              Login
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div className={`  mr-10 ${isOpen && "mb-40"}`}>
            <div className=" flex items-center justify-between">
              <h4 className=" text-white font-bold text-2xl ">All Songs</h4>
            </div>

            <div className=" mt-5 grid grid-cols-5 gap-5">
              {data?.data.map((song: any, index: number) => {
                return (
                  <div className=" group relative" key={index}>
                    <div
                      onClick={() => handleSongClick(index)}
                      key={index}
                      className=" col-span-1"
                    >
                      <img
                        src={song?.song_image}
                        alt={song.name}
                        className=" rounded-[10px] h-[180px] w-full object-cover"
                      />
                      <div className=" mt-4">
                        <h5 className=" font-semibold  text-white/80 text-center">
                          {song.name}
                        </h5>
                        <p className=" text-center text-white/60 text-sm ">
                          {song.artist}
                        </p>
                      </div>
                      {/* audio */}
                    </div>

                    {isOpen &&
                      currentSongIndex === index &&
                      currentSongIndex !== null && (
                        <>
                          <MusicPlayer
                            song={data?.data[currentSongIndex]}
                            isPlaying={isPlaying}
                            setIsPlaying={setIsPlaying}
                            playNext={playNext}
                            playPrev={playPrev}
                          />
                        </>
                      )}
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Favourite;
