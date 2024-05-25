import MusicPlayer from "@/components/playmusic";

import { useMusic } from "@/store/server/music/query";
import { useState } from "react";
import FavIcon from "./components/fav-icon";

const Home = () => {
  const [currentSongIndex, setCurrentSongIndex] = useState(0); //global state
  const [isPlaying, setIsPlaying] = useState(false);
  const [isOpen, setOpen] = useState(false);

  const { data } = useMusic();

  const handleSongClick = (idx: number) => {
    setCurrentSongIndex(idx);
    setIsPlaying(true);
    setOpen(true);
  };

  const playNext = () => {
    if (data?.data)
      setCurrentSongIndex((prevIndex) => (prevIndex + 1) % data?.data.length);
  };

  const playPrev = () => {
    if (data?.data)
      setCurrentSongIndex((prevIndex) => (prevIndex - 1) % data?.data.length);
  };

  return (
    <div className={`  mr-10 ${isOpen && "mb-40"}`}>
      <div className=" flex items-center justify-between">
        <h4 className=" text-white font-bold text-2xl ">All Songs</h4>
      </div>

      <div className=" mt-5 grid grid-cols-5 gap-5">
        {data?.data.map((song, index) => {
          return (
            <div className=" group relative" key={index}>
              <div className=" hidden  group-hover:flex items-center absolute top-2 justify-between w-full px-2">
                <FavIcon
                  song={song}
                  index={index}
                  handleSongClick={handleSongClick}
                />
              </div>
              <div key={index} className=" col-span-1">
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
  );
};

export default Home;
