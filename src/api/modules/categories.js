import axiosClient from "../axiosClient";

export const createCategory = (data) => {
  return axiosClient.post("/Category", data);
};
export const getCategories = () => {
  return axiosClient.get("/Category");
};
export const getCategoryById = (id) => {
  return axiosClient.get(`/Category/${id}`);
};
export const updateCategory = (id) => {
  return axiosClient.put(`/Category/${id}`);
};
export const deleteCategory = (id) => {
  return axiosClient.delete(`/Category/${id}`);
};
