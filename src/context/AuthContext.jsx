import { useContext, createContext, useState } from "react";
import {
  registerApi,
  loginApi,
  logoutApi,
  resendApi,
  forgotPasswordApi,
  resetPasswordApi,
} from "../api/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, settoken] = useState(() => {
    return localStorage.getItem("token") || null;
  });
  const [user, setuser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const isAdmin = user?.role === "admin";

  const registerUser = async (name, email, password, password_confirmation) => {
    try {
      const response = await registerApi(
        name,
        email,
        password,
        password_confirmation,
      );
      console.log("SUCCESS response:", response);
      const message = response.data.result.message;
      return { success: true, message };
    } catch (error) {
      console.log("ERROR object:", error);
      console.log("ERROR response:", error.response);
      const errorMessage =
        error.response?.data?.errors?.email?.[0] || "Something went wrong";
      return { success: false, error: errorMessage };
    }
  };
  const login = async (email, password) => {
    try {
      const response = await loginApi(email, password);
      const { user, token } = response.data.result;
      setuser(user);
      settoken(token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
      return { success: true };
    } catch (error) {
      const status = error.response?.status;
      const errorMessage =
        error.response?.data?.result.message || "Invalid email or password";
      return { success: false, error: errorMessage, status: status };
    }
  };
  const logout = async () => {
    try {
      const response = await logoutApi();
      setuser(null);
      settoken(null);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      return { success: true, message: response.data.message };
    } catch (error) {
      setuser(null);
      settoken(null);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      return { success: false, message: "Logout failed", error };
    }
  };
  const resendEmail = async (email) => {
    try {
      const response = await resendApi(email);
      return { success: true, message: response.data.result.message };
    } catch (error) {
      const status = error.response?.status;
      const message = error.response?.data?.result?.message;

      return {
        success: false,
        status: status,
        error: message,
      };
    }
  };
  const forgotPassword = async (email) => {
    try {
      const response = await forgotPasswordApi(email);
      return response;
    } catch (error) {
      const message = error.response?.data?.result?.message;
      return { success: false, error: message };
    }
  };
  const resetPassword = async (
    email,
    token,
    password,
    password_confirmation,
  ) => {
    try {
      const response = await resetPasswordApi(
        email,
        token,
        password,
        password_confirmation,
      );
      return {
        success: response.data.success,
        message: response.data.message,
      };
    } catch (error) {
      const message = error.response?.data?.result?.message;
      return { success: false, error: message };
    }
  };
  return (
    <AuthContext.Provider
      value={{
        registerUser,
        login,
        logout,
        resendEmail,
        token,
        user,
        isAdmin,
        forgotPassword,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useGlobalContext = () => {
  return useContext(AuthContext);
};
