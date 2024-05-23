import { axios } from "@/api/axio";
import { useQuery } from "@tanstack/react-query";
import { ApiSelect } from "../music/typed";
import { ArtistDetailProp, ArtistProp } from "./typed";

const artist = async (): Promise<ApiSelect<ArtistProp>> => {
  const { data } = await axios.get("artist");
  return data;
};

export const useArtist = () => {
  return useQuery({
    queryKey: ["artist"],
    queryFn: () => artist(),
  });
};

// ========== detail ============ //
const artistDetail = async (id: string): Promise<ArtistDetailProp> => {
  const { data } = await axios.get(`artist/${id}`);
  return data;
};

export const useArtistDetail = (id: string) => {
  return useQuery({
    queryKey: ["artist-detail", id],
    queryFn: () => artistDetail(id),
  });
};
