export const signup = async (data) => {
  const response = await axiosInstance.post("/auth/signup", signupData);
  console.log("Signup response:", response.data);
  return response.data;
};
