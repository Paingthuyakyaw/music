export interface ArtistProp {
  id: number;
  artist: string;
  artist_image: string;
  about: string;
  birth: string;
}

export interface ArtistDetailProp {
  data: {
    id: number;
    artist: string;
    artist_image: string;
    about: string;
    birth: string;
    album: {
      id: number;
      artist_id: number;
      album: string;
      album_image: string;
    }[];
  };
}
