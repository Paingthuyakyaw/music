import Cookies from "js-cookie";

import Axios from "axios";
export const axios = Axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

export const authJsonHeader = (file?: boolean) => {
  const cookieState = Cookies.get("token");
  console.log(cookieState);

  const token = cookieState ? JSON.parse(cookieState) : "";
  return {
    "Content-Type": file ? "multipart/form-data" : "Application/json",
    Accept: "Application/json",
    Authorization: `Bearer ${token}`,
  };
};

export default function transformFormData<T>(payload: T, put?: boolean) {
  const formData = new FormData();
  for (const property in payload) {
    formData.append(property, payload[property] as string | Blob);
  }
  if (put) formData.append("_method", "put");

  return formData;
}

export const logout = async () => {
  const data = axios.get("logout", {
    headers: authJsonHeader(),
  });
  return data;
};
