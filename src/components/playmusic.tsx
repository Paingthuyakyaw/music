import React, { useState, useRef, useEffect } from "react";

import {
  IconPlayerPause,
  IconPlayerPlayFilled,
  IconPlayerTrackNextFilled,
  IconPlayerTrackPrevFilled,
  IconVolume,
} from "@tabler/icons-react";

interface songProp {
  name: string;
  artist ? : string;
  song_mp3: string;
  description: string;
  song_image: string;
  artist_image ? : string;
}



const MusicPlayer = ({
  song,
  isPlaying,
  setIsPlaying,
  playNext,
  playPrev,
}: {
  song: songProp;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  isPlaying: boolean;
  playNext: () => void;
  playPrev: () => void;
}) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  // const currentSong = songs[currentSongIndex];

  const timeUpdateHandler = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const formatTime = (time: number) => {
    console.log("Input time:", time);
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    const formattedTime = `${String(minutes).padStart(2, "0")}:${String(
      seconds
    ).padStart(2, "0")}`;
    console.log("Formatted time:", formattedTime);
    return formattedTime;
  };

  const changeTimeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      const newTime = parseFloat(e.target.value);
      setCurrentTime(newTime); // Update the currentTime state
      audioRef.current.currentTime = newTime; // Set the current time of the audio element
    }
  };
  const nextSongHandler = () => {
    playNext();
    setIsPlaying(true); // Start playing the next song
    if (audioRef.current) {
      audioRef.current.play(); // Play the next song
    }
  };

  const prevSongHandler = () => {
    playPrev();
    setIsPlaying(true); // Start playing the previous song
    if (audioRef.current) {
      audioRef.current.play(); // Play the previous song
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  return (
    <div className=" grid grid-cols-12 w-full gap-10  left-0 fixed bottom-0">
      <div className=" col-span-3"></div>
      <div className=" col-span-9 rounded-t-[10px] p-5 overflow-hidden  mr-8 bg-yellow backdrop-blur-xl   ">
        <div className=" py-2 items-center justify-between flex">
          <div className=" flex items-center gap-3">
            <img
              src={song?.song_image}
              width={50}
              height={50}
              alt={song.name}
            />
            <div>
              <h5 className=" text-white font-semibold">{song.name}</h5>
              <p className=" text-white/70 text-sm ">{song.artist}</p>
            </div>
          </div>

          {/* audion , previous , next */}
          <div>
            <div className=" gap-5 flex items-center justify-center">
              <button className="mr-2" onClick={prevSongHandler}>
                <IconPlayerTrackPrevFilled className=" active:text-red-700 text-red-500 " />
              </button>
              <button className="mr-2" onClick={() => setIsPlaying(!isPlaying)}>
                {isPlaying ? (
                  <IconPlayerPause
                    size={35}
                    className=" border-2 p-2 rounded-full border-white text-white"
                  />
                ) : (
                  <IconPlayerPlayFilled
                    size={35}
                    className=" border-2 p-2 rounded-full border-white text-white"
                  />
                )}
              </button>
              <button onClick={nextSongHandler}>
                <IconPlayerTrackNextFilled className=" active:text-red-700 text-red-500" />
              </button>
            </div>

            {/* audio */}
            <div className="">
              <audio
                ref={audioRef}
                src={song.song_mp3}
                onTimeUpdate={timeUpdateHandler}
                onEnded={nextSongHandler}
              ></audio>
              <input
                type="range"
                className="w-[300px] h-[5px]  "
                value={currentTime}
                max={audioRef.current?.duration || 0}
                disabled
                onChange={changeTimeHandler}
              />
              <div className="time text-sm flex justify-between">
                <span className=" text-white text-[10px]">
                  {formatTime(currentTime)}
                </span>
                <span className=" text-white text-[10px]">
                  {formatTime(audioRef.current?.duration || 0)}
                </span>
              </div>
            </div>
          </div>

          {/* volume */}
          <div className="flex items-center gap-2">
            <span className="text-sm flex items-center gap-2 text-white">
              <IconVolume size={18} /> :
            </span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              className=" h-[3px]"
              value={volume}
              onChange={handleVolumeChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
