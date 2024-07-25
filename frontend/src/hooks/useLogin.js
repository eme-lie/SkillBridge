import { useAuthContext } from "./authHook.js";
import axios from "axios";

export const useLogin = () => {
  const { dispatch } = useAuthContext();

  const login = async ({ email, password, userType }) => {
    try {
      const response = await axios.post("/api/user/login", {
        email,
        userType,
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
