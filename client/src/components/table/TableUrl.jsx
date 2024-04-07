import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  TablePagination,
  Button,
  Tab,
} from "@mui/material";
import { useUrl } from "../../hook/useUrl";
import TableHeader from "./TableHeader";
import TableRowComponent from "./TableRow";
import TableToolbar from "./TableToolbar";
import { useTableSorting } from "../../hook/useTableSorting";
import { formatDate } from "../../utils/formatDate";
import QRCode from "react-qr-code";
import EditForm from "../editForm/EditForm";

const UrlTable = () => {
  // Obtiene la lista de todas las URL y la función para obtener todas las URL
  const { allUrls, getAllUrls, deleteAUrl, getAUrl, editAUrl } = useUrl();

  // Obtiene el orden y la columna por la que se ordena, y las funciones para establecer el orden y la columna por la que se ordena
  const { order, orderBy, handleRequestSort } = useTableSorting("desc", "date");

  // Estado para la paginación
  const [editingUrl, setEditingUrl] = useState(null);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Obtiene todas las URL
    const fetchUrls = async () => {
      await getAllUrls();
    };
    setLoading(true);
    fetchUrls();
    setLoading(false);
  }, []);

  const rows = useMemo(() => {
    return allUrls.map((urlData) => createData(urlData));
  }, [allUrls]);

  function createData(urlData) {
    return {
      id: urlData._id,
      shortUrl: urlData.shortUrlId,
      originalUrl: urlData.originalUrl,
      qrCode: <QRCode value={urlData.originalUrl} size={36} />,
      clicks: urlData.clicks,
      date: formatDate(urlData.date),
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

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = useMemo(() => {
    return stableSort(rows, getComparator(order, orderBy)).slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
  }, [order, orderBy, page, rows, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);

      // Elimina la URL con el ID dado
      await deleteAUrl(id);

      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleEdit = async (id) => {
    const data = await getAUrl(id);
    if (data) {
      setEditingUrl(data);
    } else {
      console.log("Error al obtener los detalles de la URL");
    }
  };

  const handleSaveEdit = async (data) => {
    try {
      setLoading(true);
      await editAUrl(data, editingUrl._id);
      setLoading(false);
      setEditingUrl(null);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingUrl(null);
  };

  const handleCreateUrlClick = () => {
    const selectTextField = document.getElementById("originalUrl");

    if (selectTextField) {
      selectTextField.focus();
    }
  };

  return (
    <>
      {editingUrl && (
        <EditForm
          initialData={editingUrl}
          onSave={handleSaveEdit}
          onCancel={handleCancelEdit}
        />
      )}
      <Box sx={{ width: "90%", marginX: "auto", marginY: 2 }}>
        <Paper sx={{ width: "100%" }}>
          <TableToolbar />
          <TableContainer>
            <Table>
              <TableHeader
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                headCells={[
                  { id: "shortUrl", label: "Short Url" },
                  { id: "originalUrl", label: "Original Url" },
                  { id: "clicks", label: "Clicks" },
                  { id: "qrCode", label: "QR Code" },
                  { id: "date", label: "Date" },
                  { id: "action", label: "Action" },
                ]}
              />
              {rows.length > 0 ? (
                <TableBody>
                  {visibleRows.map((row) => (
                    <TableRowComponent
                      key={row.id}
                      row={row}
                      handleEdit={handleEdit}
                      handleDelete={handleDelete}
                      loading={loading}
                    />
                  ))}
                  {emptyRows > 0 && (
                    <TableRow
                      style={{ height: 73 * emptyRows }}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              ) : (
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      You don't have any URLs yet. Create one now!
                      <Box display="flex" justifyContent="center" mt={2}>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={handleCreateUrlClick}
                        >
                          Create URL
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                </TableBody>
              )}
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
    </>
  );
};

export default UrlTable;
