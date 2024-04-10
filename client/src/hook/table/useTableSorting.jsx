import { useState } from "react";

/**
 * Compare two values to determine the sort order.
 *
 * @param {object} a - The first object to compare.
 * @param {object} b - The second object to compare.
 * @param {string} orderBy - The property to sort by.
 * @returns {number} Returns -1 if `b` is less than `a`, 1 if `b` is greater than `a`, or 0 if they are equal.
 */
function descendingComparator(a, b, orderBy, type) {
  
  if (type === "date") {
    a = new Date(a[orderBy]);
    b = new Date(b[orderBy]);

    if (b < a) {
      return -1;
    }
    if (b > a) {
      return 1;
    }
    return 0;
  } else if (type === "number") {
    return b[orderBy] - a[orderBy];
  } else {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
}

/**
 * Get a comparator function to sort an array of objects.
 *
 * @param {string} order - The sort order.
 * @param {string} orderBy - The property to sort by.
 * @returns {function} Returns the comparator function.
 */
export function getComparator(order, orderBy, type) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy, type)
    : (a, b) => -descendingComparator(a, b, orderBy, type);
}

/**
 * Sort an array of objects.
 *
 * @param {array} array - The array to sort.
 * @param {function} comparator - The comparator function to use.
 * @returns {array} Returns the sorted array.
 */
export function stableSort(array, comparator) {
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

/**
 * Hook to manage table sorting.
 *
 * @param {array} rows - The rows to sort.
 * @returns {object} Returns the sort order, the property to sort by, and the sort handler.
 */
export function useTableSorting(defaultOrder = "asc", defaultOrderBy = "date") {
  const [order, setOrder] = useState(defaultOrder);
  const [orderBy, setOrderBy] = useState(defaultOrderBy);

  /**
   * Handle a request to sort the table.
   *
   * @param {object} event - The event that triggered the sort request.
   * @param {string} property - The property to sort by.
   */
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  return {
    order,
    orderBy,
    handleRequestSort,
  };
}
