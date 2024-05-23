export interface AlbumProp {
  album: string;
  album_image: string;
  artist_id: string;
  id: string;
  artist: {
    id: number;
    artist: string;
    artist_image: string;
    about: string;
    birth: string;
  };
}

export interface AlbumPropDetail {
  data: {
    album: string;
    album_image: string;
    artist_id: string;
    id: string;
    artist: {
      id: number;
      artist: string;
      artist_image: string;
      about: string;
      birth: string;
    };
    music: {
      id: number;
      name: string;
      song_mp3: string;
      description: string;
      song_image: string;
      release_date: string;
    }[];
  };
}
