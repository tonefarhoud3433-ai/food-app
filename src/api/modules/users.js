import axiosClient from "../axiosClient";

export const getUsers = (params) => {
  return axiosClient.get("/Users", { params });
};

export const deleteUser = (id) => {
  return axiosClient.delete(`/Users/${id}`);
};
