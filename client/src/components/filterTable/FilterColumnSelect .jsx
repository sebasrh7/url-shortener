import React from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

const FilterColumnSelect = ({ column, headCells, onChange }) => {
  return (
    <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id="column-label">Column</InputLabel>
      <Select
        labelId="column-label"
        id="column"
        value={column}
        onChange={onChange}
      >
        {headCells.map((headCell) => (
          <MenuItem key={headCell.id} value={headCell.id}>
            {headCell.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default FilterColumnSelect;
