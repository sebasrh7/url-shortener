import { Toolbar, Typography, Tooltip, IconButton } from "@mui/material";
import { FilterList as FilterListIcon } from "@mui/icons-material";

const TableToolbar = () => {
  return (
    <Toolbar>
      <Typography
        sx={{ flex: "1 1 100%" }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        Urls
      </Typography>
      <Tooltip title="Filter list">
        <IconButton>
          <FilterListIcon />
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
};

export default TableToolbar;