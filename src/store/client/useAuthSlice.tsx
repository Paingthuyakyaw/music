import { StateCreator } from "zustand";
import Cookie from "js-cookie";

export interface AuthSlice {
  auth: string;
  setAuth: (auth: string) => void;
  resetAuth: () => void;
}

export const createAuthSLice: StateCreator<AuthSlice> = (set) => {
  const cookies = Cookie.get("token");

  const intialAuth = cookies ? JSON.parse(cookies) : "";

  return {
    auth: intialAuth,
    setAuth: (auth) =>
      set((state) => {
        Cookie.set("token", JSON.stringify(auth), { expires: 5 });
        return { ...state, auth };
      }),
    resetAuth: () =>
      set((state) => {
        Cookie.remove("token");
        return { ...state, auth: intialAuth };
      }),
  };
};
