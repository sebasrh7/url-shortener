import React from "react";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";

const FilterValueInput = ({ type, value, onChange }) => {
  const getValueComponent = () => {
    switch (type) {
      case "date":
        return (
          <TextField
            id="value"
            label="Value"
            variant="filled"
            type="date"
            inputMode="numeric"
            InputLabelProps={{ shrink: true }}
            value={value}
            onChange={onChange}
          />
        );
      case "text":
        return (
          <TextField
            id="value"
            label="Value"
            variant="filled"
            value={value}
            onChange={onChange}
          />
        );
      case "number":
        return (
          <TextField
            id="value"
            label="Value"
            variant="filled"
            type="number"
            inputMode="numeric"
            value={value}
            onChange={onChange}
          />
        );
      default:
        return null;
    }
  };

  return (
    <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
      {getValueComponent()}
    </FormControl>
  );
};

export default FilterValueInput;