import { createContext, useState, useEffect } from "react";
import { getProfile, deleteAccount } from "../services/authApi";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const API = import.meta.env.VITE_API_URL;
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const login = () => {
    window.open(`${API}/login`, "_self");
  };

  const logout = () => {
    window.open(`${API}/logout`, "_self");
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setIsAuthenticated(true);
        setMessage(data.message);
        setUser(data.user);
      } catch (error) {
        setIsAuthenticated(false);
        setError("You are not logged in");
        console.error(error);
      }
    };
    fetchProfile();
  }, []);

  const deleteProfile = async () => {
    try {
      const data = await deleteAccount();
      setUser(null);
      setIsAuthenticated(false);
      setMessage(data.message);
    } catch (error) {
      setError("Failed to delete account");
      console.error(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated,
        error,
        message,
        setError,
        setMessage,
        deleteProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
