import { createContext, useState } from "react";
import { shorten, getUrls, deleteUrl, getUrl, updateUrl } from "../api/urlApi";

// Se crea el contexto
export const UrlContext = createContext();

// Se provee el contexto
export const UrlProvider = ({ children }) => {
  // Se inicializa el estado
  const [url, setUrl] = useState(""); // estado para almacenar la URL acortada
  const [allUrls, setAllUrls] = useState([]); // estado para almacenar todas las URL
  const [error, setError] = useState(""); // estado para almacenar el error
  const [message, setMessage] = useState(""); // estado para almacenar el mensaje

  // Se crea la función para acortar la URL
  const shortenUrl = async (url) => {
    const data = await shorten(url);
    if (!data.error) {
      setError("");
      setUrl(data.shortUrl);
      setMessage(data.message);
      if (data.message != "URL already exists") {
        const newUrl = {
          _id: data._id,
          originalUrl: data.originalUrl,
          shortUrlId: data.shortUrl,
          clicks: data.clicks,
          date: data.date,
        };
        setAllUrls([...allUrls, newUrl]);
      }
      return;
    }

    setError(data.error);
  };

  // se crea la función para obtener las URL
  const getAllUrls = async () => {
    const data = await getUrls();
    if (data) {
      setAllUrls(data);
      return;
    } else {
      console.log(data.error);
      return;
    }
  };

  // se crea la función para eliminar una URL
  const deleteAUrl = async (id) => {
    const data = await deleteUrl(id);
    if (data) {
      setAllUrls(allUrls.filter((url) => url._id !== id));
      setMessage(data.message);
      return;
    } else {
      console.log(data.error);
      return;
    }
  };

  const getAUrl = async (id) => {
    const data = await getUrl(id);
    if (data) {
      return data;
    } else {
      console.log(data.error);
      return;
    }
  };

  const editAUrl = async (id) => {
    const data = await updateUrl(id);
    if (data) {
      setAllUrls(allUrls.filter((url) => url._id !== id));
      setMessage(data.message);
      return;
    } else {
      console.log(data.error);
      return;
    }
  };

  return (
    <UrlContext.Provider
      value={{
        url,
        setUrl,
        allUrls,
        message,
        error,
        shortenUrl,
        getAllUrls,
        deleteAUrl,
        getAUrl,
        editAUrl,
      }}
    >
      {children}
    </UrlContext.Provider>
  );
};
