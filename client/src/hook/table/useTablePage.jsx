import { useState } from "react";

export function useTablePage(defaultPage = 0, defaultRowsPerPage = 5) {
  const [page, setPage] = useState(defaultPage);
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);

  /**
   * Handles the change event when the page is changed.
   * Sets the `page` state to the new page number.
   *
   * @param {Event} event - The change event object.
   * @param {number} newPage - The new page number.
   */
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  /**
   * Handles the change event when the number of rows per page is changed.
   * Sets the `rowsPerPage` state to the new number of rows per page.
   * Sets the `page` state to 0.
   *
   * @param {Event} event - The change event object.
   * @param {number} newRowsPerPage - The new number of rows per page.
   */
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10)); 
    setPage(0);
  };

  return {
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage
  };
}
