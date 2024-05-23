export interface selectMusic {
  id: string;
  name: string;
  song_mp3: string;
  description: string;
  song_image: string;
  artist_image: string;
  artist: string;
  album: string;
  release_date: string;
}

export interface ApiSelect<T> {
  message: string;
  data: T[];
}
