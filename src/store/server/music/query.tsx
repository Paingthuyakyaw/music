import { axios } from "@/api/axio";
import { useQuery } from "@tanstack/react-query";
import { ApiSelect, selectMusic } from "./typed";

const music = async (search = "") : Promise<ApiSelect<selectMusic>>  => {
  const { data } = await axios.get(`music?search=${search}`);
  return data;
};

export const useMusic = (search ? : string) => {
  return useQuery({
    queryKey: ["music" , search],
    queryFn: () => music(search),
  });
};
