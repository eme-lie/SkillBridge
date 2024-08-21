import { useAuthContext } from "./authHook.js";
import axiosInstance from "../axiosInstance";

//const apiUrl = import.meta.env.VITE_BASE_URL;
export const useLogin = () => {
  const { dispatch } = useAuthContext();

  const login = async ({ email, password }) => {
    try {
      //console.log(apiUrl);
      const response = await axiosInstance.post(`/api/user/login`, {
        email,
        password,
      });

      const user = response.data;

      // Store the user object in localStorage
      localStorage.setItem("user", JSON.stringify(user));

      // Update the auth context or global state with the user's email
      dispatch({ type: "LOGIN", payload: user });

      console.log("User signed up:", user);
    } catch (error) {
      console.error("Error signing up:", error);
      throw error; // Re-throw the error to handle it in the calling code
    }
  };

  return { login };
};
