import React from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

const FilterOperatorSelect = ({ operators, operator, onChange }) => {
  return (
    <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id="operator-label">Operator</InputLabel>
      <Select
        labelId="operator-label"
        id="operator"
        value={operator}
        onChange={onChange}
      >
        {operators.map((op) => (
          <MenuItem key={op.id} value={op.id}>
            {op.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default FilterOperatorSelect;
