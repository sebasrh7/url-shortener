import { useMemo } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TablePagination from "@mui/material/TablePagination";
import Container from "@mui/material/Container";
import EnhancedTableToolbar from "./EnhancedTableToolbar";
import EnhancedTableHead from "./EnhancedTableHead";
import CustomTableRow from "./TableRowComponent";
import {
  stableSort,
  getComparator,
  useTableSorting,
} from "../../hook/table/useTableSorting";
import { useTableSelecting } from "../../hook/table/useTableSelecting";
import { useTablePage } from "../../hook/table/useTablePage";
import { useState } from "react";
import { useEffect } from "react";
import FilterControls from "../filterTable/FilterControls";

function EnhancedTable({ rowss, headCells }) {
  const [rows, setRows] = useState(rowss);
  const [filterActive, setFilterActive] = useState(false);

  const [filterRows, setFilterRows] = useState([]);
  const [column, setColumn] = useState(headCells[0].id);
  const [operator, setOperator] = useState("");
  const [value, setValue] = useState("");

  const handleChangeColumn = (event) => {
    setColumn(event.target.value);
  };

  const handleChangeOperator = (event) => {
    setOperator(event.target.value);
  };

  const handleChangeValue = (event) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    // Obtener el tipo de datos de la columna seleccionada
    const type = headCells.find((headCell) => headCell.id === column)?.type;

    // Obtener el primer operador de la lista correspondiente al tipo de datos
    const firstOperator = ops[type][0]?.id;

    // Seleccionar automáticamente el primer operador
    setOperator(firstOperator);
  }, [column]);

  const type = headCells.find((headCell) => headCell.id === column).type;

  const ops = {
    date: [
      { id: "is", label: "is" },
      { id: "is not", label: "is not" },
      { id: "is after", label: "is after" },
      { id: "is on or after", label: "is on or after" },
      { id: "is before", label: "is before" },
      { id: "is on or before", label: "is on or before" },
    ],
    text: [
      { id: "equals", label: "equals" },
      { id: "contains", label: "contains" },
      { id: "starts with", label: "starts with" },
      { id: "ends with", label: "ends with" },
    ],
    number: [
      { id: "=", label: "=" },
      { id: "!=", label: "!=" },
      { id: ">", label: ">" },
      { id: "<", label: "<" },
      { id: ">=", label: ">=" },
      { id: "<=", label: "<=" },
    ],
  };
  const operators = ops[type]; 

  const handleFilterRows = () => {
    // filtrar las filas que cumplan con la condición
    const newFilterRows = rows.filter((row) => {
      const rowValue = row[column];

      if (type === "date") {
        const valueDate = new Date(value);
        const rowDate = new Date(rowValue);
        if (operator === "is") {
          return rowDate.getTime() === valueDate.getTime();
        } else if (operator === "is not") {
          return rowDate.getTime() !== valueDate.getTime();
        } else if (operator === "is after") {
          return rowDate.getTime() > valueDate.getTime();
        } else if (operator === "is on or after") {
          return rowDate.getTime() >= valueDate.getTime();
        } else if (operator === "is before") {
          return rowDate.getTime() < valueDate.getTime();
        } else if (operator === "is on or before") {
          return rowDate.getTime() <= valueDate.getTime();
        } 
      } else if (type === "text") {
        const rowText = rowValue.toLowerCase();
        const valueText = value.toLowerCase();
        if (operator === "equals") {
          return rowText === valueText;
        } else if (operator === "contains") {
          return rowText.includes(valueText);
        } else if (operator === "starts with") {
          return rowText.startsWith(valueText);
        } else if (operator === "ends with") {
          return rowText.endsWith(valueText);
        }
      } else if (type === "number") {
        const valueNumber = parseFloat(value);
        const rowNumber = parseFloat(rowValue);

        if (operator === "=") {
          return rowNumber === valueNumber;
        } else if (operator === "!=") {
          return rowNumber !== valueNumber;
        } else if (operator === ">") {
          return rowNumber > valueNumber;
        } else if (operator === "<") {
          return rowNumber < valueNumber;
        } else if (operator === ">=") {
          return rowNumber >= valueNumber;
        } else if (operator === "<=") {
          return rowNumber <= valueNumber;
        }
      }
    });
    console.log(newFilterRows);
    setFilterRows(newFilterRows);
  };

  const handleClearFilterRows = () => {
    setColumn(headCells[0].id);
    setOperator("");
    setValue("");
    setFilterRows([]);
    setFilterActive(false);
  };

  const {
    selected,
    setSelected,
    handleSelectAllClick,
    handleClick,
    isSelected,
  } = useTableSelecting();

  const { handleChangePage, handleChangeRowsPerPage, page, rowsPerPage } =
    useTablePage();

  const { order, orderBy, handleRequestSort } = useTableSorting("asc", "date");
  const typeData = headCells.find((headCell) => headCell.id === orderBy).type;


  // Si page es mayor a 0, si filterActive es true, entonces se calcula el número de filas vacías de filterRows, si no, se calcula el número de filas vacías de rows y si no 0
  const emptyRows =
    page > 0
      ? filterActive && filterRows.length > 0
        ? Math.max(0, (1 + page) * rowsPerPage - filterRows.length)
        : Math.max(0, (1 + page) * rowsPerPage - rows.length)
      : 0;

  const visibleRows = useMemo(() => {
    if (filterActive && filterRows.length > 0) {
      return stableSort(filterRows, getComparator(order, orderBy, typeData)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      );
    } else {
    return stableSort(rows, getComparator(order, orderBy, typeData)).slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
    }
  }, [
    order,
    orderBy,
    page,
    rowsPerPage,
    rows,
    stableSort,
    filterActive,
    filterRows,
  ]);

  const handleDelete = () => {
    const newRows = rows.filter((row) => !selected.includes(row.id));
    // Update the rows state with the new rows array
    setRows(newRows);
    setSelected([]); // Clear selected rows after deletion
  };

  const onToggleFilter = () => {
    setFilterActive(!filterActive);
  };

  return (
    <Container>
      {filterActive && (
        <FilterControls
          column={column}
          operator={operator}
          value={value}
          headCells={headCells}
          operators={operators}
          onChangeColumn={handleChangeColumn}
          onChangeOperator={handleChangeOperator}
          onChangeValue={handleChangeValue}
          onApplyFilter={handleFilterRows}
          onClearFilter={handleClearFilterRows}
        />
      )}
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <EnhancedTableToolbar
            numSelected={selected.length}
            filterActive={filterActive}
            handleDelete={handleDelete}
            onToggleFilter={onToggleFilter}
          />
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={"medium"}
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick(rows)}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
                headCells={headCells}
              />
              <CustomTableRow
                rows={visibleRows}
                handleClick={handleClick}
                isSelected={isSelected}
                emptyRows={emptyRows}
              />
            </Table>
          </TableContainer>
          <TablePagination
            sx={{ justifyContent: "center", display: "flex" }}
            component="div"
            count={filterActive && filterRows.length > 0 ? filterRows.length : rows.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    </Container>
  );
}

export default EnhancedTable;
