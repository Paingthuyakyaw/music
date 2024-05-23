import { axios } from "@/api/axio";
import { useAuthStore } from "@/store/client/useStore";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

interface AuthProp {
  email: string;
  password: string;
}

//login

const login = (payload: AuthProp) => {
  const data = axios.post("/login", payload, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  return data;
};

export const useLogin = () => {
  const { setAuth } = useAuthStore();
  return useMutation({
    mutationFn: (payload: AuthProp) => login(payload),
    onSuccess: (data) => {
      toast.success("Login Successfully");
      setAuth(data?.data.token);
      window.location.reload();
    },
    onError: () => {
      console.log("err");
    },
  });
};