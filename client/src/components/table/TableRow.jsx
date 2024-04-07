import PropTypes from "prop-types";
import { Box, TableCell, IconButton, TableRow, Avatar } from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  FileCopy as CopyIcon,
} from "@mui/icons-material";
import { copyToClipBoard } from "../../utils/copyToClipBoard";

const TableRowComponent = ({ row, handleEdit, handleDelete, loading }) => {
  function getFaviconUrl(url) {
    if (!url) return "";
    const googleFaviconUrl = `https://www.google.com/s2/favicons?sz=64&domain=${url}`;
    return googleFaviconUrl;
  }

  return (
    <TableRow
      tabIndex={-1}
      key={row.id}
      sx={{
        "&:last-child td, &:last-child th": { border: 0 },
      }}
      style={{
        height: 73,
      }}
      className="hover:bg-gray-200 transition-colors duration-100 ease-in-out"
    >
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
          <IconButton
            onClick={() => copyToClipBoard(url.shortUrl)}
            disabled={loading}
          >
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
          <Avatar
            alt="Favicon"
            src={getFaviconUrl(row.originalUrl)}
            sx={{ width: 24, height: 24, mr: 1, loading: "eager" }}
          />
          <span className="ml-4 overflow-ellipsis overflow-hidden whitespace-nowrap">
            {row.originalUrl}
          </span>
        </Box>
      </TableCell>
      <TableCell align="left">{row.clicks}</TableCell>
      <TableCell align="left">{row.qrCode}</TableCell>
      <TableCell align="left">{row.date}</TableCell>
      <TableCell align="left" sx={{ width: "120px" }}>
        <Box component="div" sx={{ display: "flex" }}>
          <IconButton onClick={() => handleEdit(row.id)} disabled={loading}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDelete(row.id)} disabled={loading}>
            <DeleteIcon />
          </IconButton>
        </Box>
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
