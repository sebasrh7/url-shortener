import PropTypes from "prop-types";
import { Box, TableCell, IconButton, TableRow } from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  FileCopy as CopyIcon,
} from "@mui/icons-material";

const TableRowComponent = ({ row, handleEdit, handleDelete, loading }) => {
  function getFaviconUrl(url) {
    if (!url) return "";
    const googleFaviconUrl = `https://www.google.com/s2/favicons?sz=32&domain=${url}`;
    return googleFaviconUrl;
  }

  return (
    <TableRow hover tabIndex={-1} key={row.id}>
      <TableCell align="left">
        <Box
          component="div"
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <a
            href={row.shortUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline cursor-pointer w-44 mr-4 overflow-ellipsis overflow-hidden whitespace-nowrap"
          >
            {row.shortUrl}
          </a>
          <IconButton onClick={() => {}} disabled={loading}>
            <CopyIcon />
          </IconButton>
        </Box>
      </TableCell>
      <TableCell align="left" sx={{ maxWidth: "300px" }}>
        <Box
          component="a"
          href={row.originalUrl}
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            "&:hover": {
              textDecoration: "underline",
            },
          }}
        >
          <img
            src={getFaviconUrl(row.originalUrl)}
            alt="favicon"
            loading={"eager"}
            className="w-6 h-6 aspect-square"
          />
          <span className="ml-4 overflow-ellipsis overflow-hidden whitespace-nowrap">
            {row.originalUrl}
          </span>
        </Box>
      </TableCell>
      <TableCell align="left">{row.clicks}</TableCell>
      <TableCell align="left">{row.date}</TableCell>
      <TableCell align="left" sx={{ width: "120px" }}>
        <IconButton onClick={() => handleEdit(row.id)} disabled={loading}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={() => handleDelete(row.id)} disabled={loading}>
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

TableRowComponent.propTypes = {
  row: PropTypes.shape({
    id: PropTypes.string.isRequired,
    shortUrl: PropTypes.string.isRequired,
    originalUrl: PropTypes.string.isRequired,
    clicks: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
  }).isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default TableRowComponent;
