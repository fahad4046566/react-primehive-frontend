import { axiosInstance } from "./axiosIntanse";

export const getProductsApi = async (params = {}) => {
  const response = await axiosInstance.get("/products", { params: params });
  return response;
};
export const getProductByIdApi = async (id) => {
  const response = await axiosInstance.get(`/products/${id}`);
  return response;
};
export const getCategoriesApi = async () => {
  const response = await axiosInstance.get("/categories");
  return response;
};
export const getCategoriesByIdApi = async (id) => {
  const response = await axiosInstance.get(`/categories/${id}`);
  return response;
};
