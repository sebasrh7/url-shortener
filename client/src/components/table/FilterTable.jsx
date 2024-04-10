import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import useFilter from "../../hook/table/useFilter";

export default function FilterTable({rows}) {
  const { column, operator, value, setColumn, setOperator, setValue, setFilterRows, filterRows } =
    useFilter();

  const handleChangeColumn = (event) => {
    setColumn(event.target.value);
  };

  const handleChangeOperator = (event) => {
    setOperator(event.target.value);
  };

  const handleChangeValue = (event) => {
    setValue(event.target.value);
  };

  const handleFilterRows = () => {
    const filteredRows = rows.filter((row) => {
      if (operator === "none") {
        return true;
      }
      if (operator === "equals") {
        return row[column] === value;
      }
      if (operator === "contains") {
        return row[column].includes(value);
      }
      if (operator === "greaterThan") {
        return row[column] > value;
      }
      if (operator === "lessThan") {
        return row[column] < value;
      }
    });

    setFilterRows(filteredRows);
  };

  return (
    <div>
      {
        filterRows.map((row) => (
          <div key={row.id}>
            <p>{row.name}</p>
            <p>{row.calories}</p>
            <p>{row.fat}</p>
            <p>{row.carbs}</p>
            <p>{row.protein}</p>
          </div>
        ))
      }
      <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="column-label">Column</InputLabel>
        <Select
          labelId="column-label"
          id="column"
          value={column}
          onChange={handleChangeColumn}
        >
          <MenuItem value={"none"}>None</MenuItem>
          <MenuItem value={"name"}>Name</MenuItem>
          <MenuItem value={"calories"}>Calories</MenuItem>
          <MenuItem value={"fat"}>Fat</MenuItem>
          <MenuItem value={"carbs"}>Carbs</MenuItem>
          <MenuItem value={"protein"}>Protein</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="operator-label">Operator</InputLabel>
        <Select
          labelId="operator-label"
          id="operator"
          value={operator}
          onChange={handleChangeOperator}
        >
          <MenuItem value={"none"}>None</MenuItem>
          <MenuItem value={"equals"}>Equals</MenuItem>
          <MenuItem value={"contains"}>Contains</MenuItem>
          <MenuItem value={"greaterThan"}>Greater than</MenuItem>
          <MenuItem value={"lessThan"}>Less than</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
        <TextField
          id="value"
          label="Value"
          variant="filled"
          value={value}
          onChange={handleChangeValue}
        />
      </FormControl>
      <button onClick={handleFilterRows}>Apply Filter</button>
    </div>
  );
}
