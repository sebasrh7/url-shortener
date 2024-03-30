import { useState } from "react";

export const useTableSorting = (initialOrder, initialOrderBy) => {
  const [order, setOrder] = useState(initialOrder);
  const [orderBy, setOrderBy] = useState(initialOrderBy);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  return { order, orderBy, handleRequestSort };
};
