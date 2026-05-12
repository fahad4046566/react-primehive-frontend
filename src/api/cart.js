import { axiosInstance } from "./axiosIntanse";

export const getCartApi = async () => { 
    const response = await axiosInstance.get('/cart');
    return response
 }
export const addToCartApi = async (product_id, quantity) => { 
   const response = await axiosInstance.post('/cart/add',{product_id,quantity});
    return response
 }
export const updateQuantityApi = async (product_id, quantity) => { 
     const response = await axiosInstance.put('/cart/update',{product_id,quantity});
    return response;
 }
export const removeItemApi = async (product_id) => { 
     const response = await axiosInstance.delete('/cart/remove',{
        data:{product_id}
     });
    return response;
 }
export const clearCartApi = async () => { 
    const response = await axiosInstance.delete('/cart/clear');
    return response;
 }