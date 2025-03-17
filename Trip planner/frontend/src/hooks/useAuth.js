import { useDispatch } from "react-redux";
import { loginSuccess, logoutSuccess } from "../store/authSlice";

export const useAuth = () => {
  const dispatch = useDispatch();

  const login = async (email, password) => {
    try {
      const response = await fetch("http://localhost:3000/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",  // Required for cookies
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      dispatch(loginSuccess({ email })); // Store user in Redux
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const logout = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/user/logout", {
        method: "POST",
        credentials: "include", // Send cookies with request
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      dispatch(logoutSuccess()); // Clear user from Redux
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return { login, logout };
};
