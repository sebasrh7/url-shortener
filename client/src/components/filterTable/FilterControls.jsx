import React from "react";
import FilterColumnSelect from "./FilterColumnSelect ";
import FilterOperatorSelect from "./FilterOperatorSelect ";
import FilterValueInput from "./FilterValueInput ";
import Button from "@mui/material/Button";

const FilterControls = ({
  column,
  operator,
  value,
  headCells,
  operators,
  onChangeColumn,
  onChangeOperator,
  onChangeValue,
  onApplyFilter,
  onClearFilter,
}) => {
  return (
    <div>
      <FilterColumnSelect
        column={column}
        headCells={headCells}
        onChange={onChangeColumn}
      />
      <FilterOperatorSelect
        column={column}
        operators={operators}
        operator={operator}
        onChange={onChangeOperator}
      />
      <FilterValueInput
        type={headCells.find((headCell) => headCell.id === column).type}
        value={value}
        onChange={onChangeValue}
      />
        <Button variant="contained" onClick={onApplyFilter}>
            Apply Filter
        </Button>
        <Button variant="contained" onClick={onClearFilter}>
            Clear Filter
        </Button>
    </div>
  );
};

export default FilterControls;
