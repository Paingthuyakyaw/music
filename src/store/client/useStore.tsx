import { create } from "zustand";
import { AuthSlice, createAuthSLice } from "./useAuthSlice";

export const useStore = create<AuthSlice>((...a) => ({
  ...createAuthSLice(...a),
}));

export const useAuthStore = () => {
  const { auth, setAuth, resetAuth } = useStore((state) => ({
    auth: state.auth,
    setAuth: state.setAuth,
    resetAuth: state.resetAuth,
  }));

  return { auth, setAuth, resetAuth };
};
