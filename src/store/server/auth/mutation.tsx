import { authJsonHeader, axios } from "@/api/axio";
import { useAuthStore } from "@/store/client/useStore";
import { useMutation, useQuery } from "@tanstack/react-query";
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

interface registerProp {
  username: string;
  email: string;
  password: string;
  password_confirmation: string;
}

const register = async (payload: registerProp) => {
  const data = await axios.post("register", payload, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  return data;
};

export const useRegister = () => {
  return useMutation({
    mutationFn: (payload: registerProp) => register(payload),
  });
};

const me = async () => {
  const { data } = await axios.get("me", {
    headers: authJsonHeader(),
  });
  return data;
};

export const useMe = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: () => me(),
  });
};
