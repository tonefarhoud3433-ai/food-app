import axiosClient from "../axiosClient";

export const createRecipe = (data) => {
  return axiosClient.post("/Recipe", data);
};
export const getRecipes = () => {
  return axiosClient.get("/Recipe");
};
export const getRecipeById = (id) => {
  return axiosClient.get(`/Recipe/${id}`);
};
export const updateRecipe = (id, data) => {
  return axiosClient.put(`/Recipe/${id}`, data);
};
export const deleteRecipe = (id) => {
  return axiosClient.delete(`/Recipe/${id}`);
};
