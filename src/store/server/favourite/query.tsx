import { authJsonHeader, axios } from "@/api/axio";
import { useQuery } from "@tanstack/react-query";

const favouriteList = async () => {
  const { data } = await axios.get("favourite", {
    headers: authJsonHeader(),
  });
  return data;
};

export const useFavouriteList = () => {
  return useQuery({
    queryKey: ["favourite"],
    queryFn: () => favouriteList(),
  });
};
