import { useContext } from "react";
import { UrlContext } from "../context/UrlContext";

export const useUrl = () => {
  // se obtiene el contexto
  const context = useContext(UrlContext);

  // se valida que el contexto exista
  if (!context) {
    throw new Error("useUrl must be used within a UrlProvider");
  }

  // se retorna el contexto
  return context;
};
