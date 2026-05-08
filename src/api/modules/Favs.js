import axiosClient from "../axiosClient";

export const getFavs = (params) => {
  return axiosClient.get("/userRecipe", { params });
};
export const createFavs = (data) => {
  return axiosClient.post("/userRecipe", data);
};
export const deleteFav = (id) => {
  return axiosClient.delete(`/userRecipe/${id}`);
};
