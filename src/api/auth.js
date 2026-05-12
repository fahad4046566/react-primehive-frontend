import { axiosInstance } from "./axiosIntanse";

export const registerApi = async(name,email,password,password_confirmation) => {
 const response =await axiosInstance.post('/register',{name,email,password,password_confirmation})
 return response
}

export const loginApi = async(email,password)=>{
 const response =await axiosInstance.post('/login',{email,password})
 return response
}
export const logoutApi = async()=>{
 const response =await axiosInstance.post('/logout')
 return response
}
export const resendApi = async (email) => {
    const response =await axiosInstance.post('/email/resend',{email})
    return response
}

export const forgotPasswordApi = async (email) => {
    const response =await axiosInstance.post('/forgot-password',{email})
    return response;
}
export const resetPasswordApi = async (email,token,password,password_confirmation) => {
    const response =await axiosInstance.post('/reset-password',{email,token,password,password_confirmation})
    return response;
}
