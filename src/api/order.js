import { axiosInstance } from "./axiosIntanse";

export const checkoutApi = async (data) => {
  const response = await axiosInstance.post("/checkout",  data );
  return response;
};
export const getOrdersApi = async () => {
  const response = await axiosInstance.get("/orders");
  return response;
};
export const getOrderByIdApi = async (id) => {
  const response = await axiosInstance.get(`/orders/${id}`);
  return response;
};
export const getAdminOrdersApi = async (params = {}) => {
  const response = await axiosInstance.get("/admin/orders",{ params: params });
  return response;
};

export const getAdminOrdersStatusApi = async (id,data) => {
   const response = await axiosInstance.put(`/admin/orders/${id}/status`,data);
  return response;
}