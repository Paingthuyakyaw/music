import { authJsonHeader, axios } from "@/api/axio";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface musicProp {
  music_id: number;
}

const addFaourite = async (payload: musicProp) => {
  const { data } = await axios.post(`favourite`, payload, {
    headers: authJsonHeader(),
  });
  return data;
};

export const useAddFavourite = () => {
  const query = useQueryClient();
  return useMutation({
    mutationFn: (payload: musicProp) => addFaourite(payload),
    onSuccess: () => {
      query.invalidateQueries({ queryKey: ["favourite"] });
    },
  });
};

const deleteFavourite = async (id: number) => {
  const { data } = await axios.delete(`favourite/${id}`, {
    headers: authJsonHeader(),
  });
  return data;
};

export const useDeleteFavourite = () => {
  const query = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteFavourite(id),
    onSuccess: () => {
      query.invalidateQueries({ queryKey: ["favourite"] });
    },
  });
};
