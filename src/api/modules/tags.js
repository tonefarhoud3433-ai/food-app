import axiosClient from "../axiosClient";

export const getTags = (params) => {
  return axiosClient.get("/tag", { params });
};
