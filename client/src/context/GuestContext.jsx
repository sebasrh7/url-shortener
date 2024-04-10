import { createContext, useState } from "react";
import {
  guestShorten,
  guestGetUrls,
  guestDeleteSelected,
  guestGetUrl,
  guestDeleteUrl,
} from "../services/guestApi";
import { copyToClipBoard } from "../utils/copyToClipBoard";

// Se crea el contexto
export const GuestContext = createContext();

// Se provee el contexto
export const GuestProvider = ({ children }) => {
  // Se inicializa el estado
  const [url, setUrl] = useState(""); // estado para almacenar la URL acortada
  const [allUrls, setAllUrls] = useState([]); // estado para almacenar todas las URL
  const [error, setError] = useState(""); // estado para almacenar el error
  const [message, setMessage] = useState(""); // estado para almacenar el mensaje
  // incializa segun el local storage si el switch esta activado o no,     // si no hay nada en el local storage, se inicializa en true
  const [checked, setChecked] = useState(
    localStorage.getItem("checked") === null
      ? true
      : localStorage.getItem("checked") === "true"
  );

  // Se crea la función para acortar la URL
  const guestShortenUrl = async (url) => {
    const data = await guestShorten(url);
    if (!data.error) {
      setError("");
      setUrl(data.shortUrl);
      setMessage(data.message);
      if (checked) {
        copyToClipBoard(data.shortUrl);
      } else {
        copyToClipBoard('');
      }
      if (data.message != "URL already exists") {
        const newUrl = {
          _id: data._id,
          originalUrl: data.originalUrl,
          shortUrlId: data.shortUrlId,
          shortUrl: data.shortUrl,
          date: data.date,
        };
        setAllUrls([...allUrls, newUrl]);
      }
      return;
    }
    setError(data.error);
  };

  // se crea la función para obtener las URL
  const getGuestAllUrls = async () => {
    const data = await guestGetUrls();
    if (data) {
      setAllUrls(data);
      return;
    } else {
      console.log(data.error);
      return;
    }
  };

  // se crea la función para eliminar una URL
  const deleteGuestAUrl = async (id) => {
    const data = await guestDeleteUrl(id);
    if (data) {
      setAllUrls(allUrls.filter((url) => url._id !== id));
      setMessage(data.message);
      return;
    } else {
      console.log(data.error);
      return;
    }
  };

  const getGuestAUrl = async (id) => {
    const data = await guestGetUrl(id);
    if (data) {
      return data;
    } else {
      console.log(data.error);
      return;
    }
  };

  return (
    <GuestContext.Provider
      value={{
        url,
        allUrls,
        error,
        message,
        checked,
        setChecked,
        guestShortenUrl,
        getGuestAllUrls,
        deleteGuestAUrl,
        getGuestAUrl,
      }}
    >
      {children}
    </GuestContext.Provider>
  );
};
