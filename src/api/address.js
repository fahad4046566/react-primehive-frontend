import { axiosInstance } from "./axiosIntanse";

export const getAddressApi = async () => {
    const response = await axiosInstance.get('/addresses');
    return response
}
export const addAddressApi = async (data) => {
    const response = await axiosInstance.post('/addresses',data);
    return response
}