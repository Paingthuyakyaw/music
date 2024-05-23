import { axios } from "@/api/axio";
import { useQuery } from "@tanstack/react-query";
import { ApiSelect } from "../music/typed";
import { AlbumProp, AlbumPropDetail } from "./typed";

const album = async (): Promise<ApiSelect<AlbumProp>> => {
  const { data } = await axios.get("album");
  return data;
};

export const useAlbum = () => {
  return useQuery({
    queryKey: ["album"],
    queryFn: () => album(),
  });
};

const albumDetail = async (id: number): Promise<AlbumPropDetail> => {
  const { data } = await axios.get(`album/${id}`);
  return data;
};

export const useAlbumDetail = (id: number) => {
  return useQuery({
    queryKey: ["album-detail", id],
    queryFn: () => albumDetail(id),
  });
};
