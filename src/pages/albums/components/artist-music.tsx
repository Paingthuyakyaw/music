import MusicPlayer from "@/components/playmusic";
import { useState } from "react";

interface musicProp {
  name: string;
  song_mp3: string;
  description: string;
  song_image: string;
  release_date: string;
}

const ArtistMusic = ({ music }: { music: musicProp[] }) => {
  const [currentSongIndex, setCurrentSongIndex] = useState(0); //global state
  const [isPlaying, setIsPlaying] = useState(false);
  const [isOpen, setOpen] = useState(false);

  const handleSongClick = (idx: number) => {
    setCurrentSongIndex(idx);
    setIsPlaying(true);
    setOpen(true);
  };

  const playNext = () => {
    if (music.length)
      setCurrentSongIndex((prevIndex) => (prevIndex + 1) % music.length);
  };

  const playPrev = () => {
    if (music.length)
      setCurrentSongIndex((prevIndex) => (prevIndex - 1) % music.length);
  };

  return (
    <div className={`relative mt-5   mr-10 ${isOpen && 'mb-40'} `}>
      <div className=" flex items-center justify-between">
        <h4 className=" text-white font-bold text-2xl ">Artist Songs</h4>
      </div>

      <div className=" mt-5 grid grid-cols-5 gap-5">
        {music.map((song, index) => {
          return (
            <div key={index}>
              <div
                key={index}
                onClick={() => handleSongClick(index)}
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
                </div>
                {/* audio */}
              </div>

              {isOpen &&
                currentSongIndex === index &&
                currentSongIndex !== null && (
                  <>
                    <MusicPlayer
                      song={music[currentSongIndex]}
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

export default ArtistMusic;
