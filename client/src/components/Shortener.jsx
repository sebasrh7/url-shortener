import { Box, InputAdornment, TextField, Button } from "@mui/material";
import { Link } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { useUrl } from "../hook/useUrl";
import { useState } from "react";

const Shortener = () => {
  const {  error, message, shortenUrl } = useUrl(); // Se obtiene el estado y la función del contexto

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    await shortenUrl(data);
    setLoading(false); // Agrega la URL acortada a la lista de URLs
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ width: 660, maxWidth: "100%" }}
      >
        <TextField
          label="URL"
          placeholder="Enter URL to shorten"
          variant="outlined"
          fullWidth
          {...register("originalUrl", { required: "URL is required" })}
          error={Boolean(errors.originalUrl) || Boolean(error)} // Considera también el error del contexto useUrl
          helperText={
            errors.originalUrl ? errors.originalUrl.message : error ? error : "" // Mostrar el mensaje de error del formulario o el error del contexto
          }
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
                  Shorten Now!
                </Button>
              </InputAdornment>
            ),
          }}
        />
      </form>
      {message && <Box mt={2}>{message}</Box>}
    </Box>
  );
};

export default Shortener;
