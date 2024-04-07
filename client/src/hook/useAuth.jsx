import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useAuth = () => {
  // se obtiene el contexto
  const context = useContext(AuthContext);

  // se valida que el contexto exista
  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }

  // se retorna el contexto
  return context;
};
