import { useGuest } from "../../hook/useGuest";
import { useEffect } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import {
  Delete as DeleteIcon,
  FileCopy as CopyIcon,
} from "@mui/icons-material";
import { formatDate } from "../../utils/formatDate";
import { copyToClipBoard } from "../../utils/copyToClipBoard";

export const CardUrl = () => {
  const { allUrls, getGuestAllUrls, deleteGuestAUrl } = useGuest(); // Se obtiene el estado del contexto

  useEffect(() => {
    const fetchUrls = async () => {
      await getGuestAllUrls(); // Llama a la función para obtener todas las URLs
    };
    fetchUrls();
  }, []);

  const handleDelete = async (id) => {
    await deleteGuestAUrl(id); // Llama a la función para eliminar una URL
  };

  return (
    <>
      <Container>
        <Grid container spacing={2}>
          {allUrls.map((url) => (
            <Grid item xs={12} sm={6} md={4} key={url._id}>
              <Paper className="p-3">
                <Box className="flex items-center justify-between">
                  <a
                    href={`${url.shortUrl}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center space-x-[1px] font-medium transition-opacity duration-75 hover:opacity-80"
                  >
                    <span className="text-sm opacity-40">/</span>
                    <span>{url.shortUrlId}</span>
                  </a>

                  <Box className="flex items-center space-x-2">
                    <IconButton onClick={() => copyToClipBoard(url.shortUrl)}>
                      <CopyIcon />
                    </IconButton>

                    <IconButton onClick={() => handleDelete(url._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
                <Box>
                  <p
                    className="mb-2 truncate text-sm text-neutral-500 dark:text-neutral-400"
                    title="a"
                  >
                    {url.originalUrl}
                  </p>
                </Box>
                <Box>
                  <div className="flex items-center justify-start text-xs font-medium text-neutral-600 dark:text-neutral-400 md:space-x-2">
                    <p>{formatDate(url.date)}</p>
                  </div>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default CardUrl;
