import { useContext } from "react";
import { GuestContext } from "../context/GuestContext";

export const useGuest = () => {
  // se obtiene el contexto
  const context = useContext(GuestContext);

  // se valida que el contexto exista
  if (!context) {
    throw new Error("useUrl must be used within a UrlProvider");
  }

  // se retorna el contexto
  return context;
};
