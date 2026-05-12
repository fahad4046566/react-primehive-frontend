import { axiosInstance } from "./axiosIntanse";

//  same get products in products.js

export const adminCreateProductApi = async (formData) => {
  const response = await axiosInstance.post("/admin/products", formData );
  return response;
};
export const adminUpdateProductApi = async (id, formData) => {
  const response = await axiosInstance.post(`/admin/products/${id}`, formData);
  return response;
};
export const adminDeleteProductApi = async (id) => {
  const response = await axiosInstance.delete(`/admin/products/${id}`);
  return response;
};
// same get category from products
export const adminCreateCategoryApi = async (data) => {
  const response = await axiosInstance.post("/admin/categories",  data );
  return response;
};
export const adminUpdateCategoryApi = async (id, data) => {
  const response = await axiosInstance.put(`/admin/categories/${id}`,  data );
  return response;
};
export const adminDeleteCategoryApi = async (id) => {
  const response = await axiosInstance.delete(`/admin/categories/${id}` );
  return response;
};
// for ai description generate
export const generateDescriptionApi = async (productName) => {
    const response = await axiosInstance.post('/admin/ai/generate-description', {
        product_name: productName
    });
    return response;
}