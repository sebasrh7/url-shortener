import { InputAdornment, TextField, Button } from "@mui/material";
import { Link } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { useUrl } from "../../hook/useUrl";
import { useAuth } from "../../hook/useAuth";
import { useGuest } from "../../hook/useGuest";
import { useState } from "react";
const Shortener = () => {
  const { shortenUrl } = useUrl(); // Se obtiene el estado y la función del contexto
  const { guestShortenUrl } = useGuest(); // Se obtiene el estado y la función del contexto
  const { isAuthenticated } = useAuth(); // Se obtiene el estado del contexto

  const { register, handleSubmit } = useForm();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      if (isAuthenticated) {
        setLoading(true);
        await shortenUrl(data.originalUrl); // Llama a la función para acortar la URL
        const textField = document.getElementById("originalUrl");
        textField.value = ""; // Limpia el campo de texto
        setLoading(false); // Agrega la URL acortada a la lista de URLs
      } else {
        setLoading(true);
        await guestShortenUrl(data.originalUrl); // Llama a la función para acortar la URL
        const textField = document.getElementById("originalUrl");
        textField.value = ""; // Limpia el campo de texto
        setLoading(false); // Agrega la URL acortada a la lista de URLs
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <>
      {isAuthenticated ? (
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ flex: 1, padding: "0 1rem" }}
        >
          <div className="max-w-4xl mx-auto">
            <TextField
              id="originalUrl"
              label="Enter your URL here"
              placeholder="https://example.com"
              variant="filled"
              fullWidth
              {...register("originalUrl", { required: "URL is required" })}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Link color="action" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      disabled={loading}
                    >
                      Shorten
                    </Button>
                  </InputAdornment>
                ),
              }}
            />
          </div>
        </form>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} style={{ margin: "2rem 0" }}>
          <div className="max-w-2xl mx-auto">
            <TextField
              id="originalUrl"
              label="Enter your URL here"
              placeholder="https://example.com"
              variant="filled"
              fullWidth
              {...register("originalUrl", { required: "URL is required" })}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Link color="action" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      disabled={loading}
                    >
                      Shorten
                    </Button>
                  </InputAdornment>
                ),
              }}
            />
          </div>
        </form>
      )}
    </>
  );
};

export default Shortener;
