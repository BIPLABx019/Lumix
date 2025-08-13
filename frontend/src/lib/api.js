import { axiosInstance } from "../lib/axios";

export const signup = async (signupData) => {
  const response = await axiosInstance.post("/auth/signup", signupData);
  console.log("Signup response:", response.data);
  return response.data;
};
