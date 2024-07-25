import { useAuthContext } from "./authHook.js";

export const useLogout = () => {
  const { dispatch } = useAuthContext();

  const logout = async () => {
    // remove the user object from localStorage
    localStorage.removeItem("user", JSON.stringify("user"));

    // dispatch logout action
    dispatch({ type: "LOGIN" });
  };

  return { logout };
};
