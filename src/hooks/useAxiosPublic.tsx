import axios from "axios";

export const useAxiosPublic = () => {
  return axios.create({
    baseURL: "http://localhost:3000",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
    withCredentials: true,
  });
};
