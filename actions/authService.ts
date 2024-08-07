import axios from "axios";
import BackendApi from "@/app/common";
import { LoginData, RegisterData } from "@/types";
import { headers } from "next/headers";




export const login = async (data: LoginData) => {
  try {
    const response = await axios.post(BackendApi.signIn.url, data, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.error("Error signing in:", error);
    throw new Error('Error signing in. Please try again.');
  }
};

export const register = async (data: RegisterData) => {
    try {
      const response = await axios.post(BackendApi.signUP.url, data);
  
      return response.data;
    } catch (error) {
      console.error('Error signing up:', error);
      throw new Error('Error signing up. Please try again.');
    }
  };

interface ForgotPasswordResponse {
  message: string;
}

export const forgotPassword = async (email: string): Promise<ForgotPasswordResponse> => {
  try {
    const response = await axios.post(
      BackendApi.forgotPassword.url,
      { email: email },
    );

    if (!response.data) {
      throw new Error('Empty response received');
    }

    return response.data;
  } catch (error) {
    console.error('Error requesting password reset:', error);
    throw new Error('Error requesting password reset. Please try again.');
  }
};

  export const resetPassword = async (token: string, password: string): Promise<void> => {
    try {
      const response = await axios.post(
        `${BackendApi.resetPassword.url}`,
        { token, password },
        { withCredentials: true }
      );
  
      if (response.status !== 200) {
        throw new Error(`Error resetting password: ${response.statusText}`);
      }
  
      console.log('reset-response', response.data);
      return response.data;
    } catch (error) {
      console.error('Error resetting password:', error);
      throw new Error('Error resetting password. Please try again.');
    }
  };
  

export const logout = async () => {
  try {
    const response = await axios(BackendApi.logout_user.url, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.error('Error logging out:', error);
    throw new Error('Error logging out. Please try again.');
  }
};