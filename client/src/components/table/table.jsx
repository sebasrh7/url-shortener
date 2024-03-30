import PropTypes from "prop-types";
import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  FilterList as FilterListIcon,
} from "@mui/icons-material";
import { visuallyHidden } from "@mui/utils";
import { useState, useMemo, useEffect } from "react";
import { useUrl } from "../../hook/useUrl";

const UrlTable = () => {
  const { allUrls, getAllUrls } = useUrl();

  useEffect(() => {
    getAllUrls();
  }, []);

  const rows = allUrls.map((urlData) => createData(urlData));

  function createData(urlData) {
    return {
      id: urlData._id,
      shortUrl: urlData.shortUrlId,
      originalUrl: urlData.originalUrl,
      clicks: urlData.clicks,
      date: new Date(urlData.date).toLocaleDateString(),
    };
  }

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

//   const headCells = [
//     { id: "shortUrl", label: "Url corta" },
//     { id: "originalUrl", label: "Url original" },
//     { id: "clicks", label: "Clicks" },
//     { id: "date", label: "Fecha" },
//     { id: "action", label: "Acción" },
//   ];

//   function EnhancedTableHead(props) {
//     const { order, orderBy, onRequestSort } = props;
//     const createSortHandler = (property) => (event) => {
//       onRequestSort(event, property);
//     };

//     return (
//       <TableHead>
//         <TableRow>
//           {headCells.map((headCell) => (
//             <TableCell
//               key={headCell.id}
//               align={"left"}
//               padding="normal"
//               sortDirection={orderBy === headCell.id ? order : false}
//             >
//               {headCell.id !== "action" ? (
//                 <TableSortLabel
//                   active={orderBy === headCell.id}
//                   direction={orderBy === headCell.id ? order : "asc"}
//                   onClick={createSortHandler(headCell.id)}
//                 >
//                   {headCell.label}
//                   {orderBy === headCell.id ? (
//                     <Box component="span" sx={visuallyHidden}>
//                       {order === "desc"
//                         ? "sorted descending"
//                         : "sorted ascending"}
//                     </Box>
//                   ) : null}
//                 </TableSortLabel>
//               ) : (
//                 headCell.label
//               )}
//             </TableCell>
//           ))}
//         </TableRow>
//       </TableHead>
//     );
//   }

//   EnhancedTableHead.propTypes = {
//     onRequestSort: PropTypes.func.isRequired,
//     order: PropTypes.oneOf(["asc", "desc"]).isRequired,
//     orderBy: PropTypes.string.isRequired,
//   };

//   function EnhancedTableToolbar() {
//     return (
//       <Toolbar>
//         <Typography
//           sx={{ flex: "1 1 100%" }}
//           variant="h6"
//           id="tableTitle"
//           component="div"
//         >
//           Url Shortener
//         </Typography>
//         <Tooltip title="Filter list">
//           <IconButton>
//             <FilterListIcon />
//           </IconButton>
//         </Tooltip>
//       </Toolbar>
//     );
//   }

  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("date");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage]
  );

  const handleDelete = (id) => {
    // Lógica para eliminar la fila con el ID dado
    console.log(`Eliminar fila con ID: ${id}`);
  };

  const handleEdit = (id) => {
    // Lógica para editar la fila con el ID dado
    console.log(`Editar fila con ID: ${id}`);
  };

  return (
    <Box sx={{ width: "90%", marginX: "auto", marginTop: 2 }}>
      <Paper sx={{ width: "100%" }}>
        <EnhancedTableToolbar />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={"medium"}
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {visibleRows.map((row) => (
                <TableRow hover tabIndex={-1} key={row.id}>
                  <TableCell align="left">{row.shortUrl}</TableCell>
                  <TableCell
                    align="left"
                    sx={{
                      maxWidth: "200px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {row.originalUrl}
                  </TableCell>
                  <TableCell align="left">{row.clicks}</TableCell>
                  <TableCell align="left">{row.date}</TableCell>
                  <TableCell align="left" sx={{ width: "120px" }}>
                    <IconButton
                      aria-label="edit"
                      onClick={() => handleEdit(row.id)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      onClick={() => handleDelete(row.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 73 * emptyRows }}>
                  <TableCell colSpan={5} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default UrlTable;