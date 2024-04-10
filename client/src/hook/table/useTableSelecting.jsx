import { useState } from "react";

export function useTableSelecting() {
  const [selected, setSelected] = useState([]);

  /**
   * Handles the click event when the "Select All" checkbox is clicked.
   * If the checkbox is checked, selects all rows by setting the `selected` state to an array of all row IDs.
   * If the checkbox is unchecked, clears the selection by setting the `selected` state to an empty array.
   *
   * @param {Event} event - The click event object.
   */
  const handleSelectAllClick = (rows) => (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  /**
   * Handles the click event for selecting an item.
   * If the item is not selected, adds the item to the `selected` state.
   * If the item is already selected, removes the item from the `selected` state.
   * If the item is the only selected item, clears the selection.
   * If the item is selected along with other items, removes the item from the selection.
   *
   * @param {Event} event - The click event.
   * @param {string} id - The ID of the item.
   */
  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  /**
   * Checks if a row is selected.
   * 
   * @param {string} id - The ID of the row.
   * @returns {boolean} `true` if the row is selected, `false` otherwise.
   */
  const isSelected = (id) => selected.indexOf(id) !== -1;

  return {
    selected,
    setSelected,
    handleSelectAllClick,
    handleClick,
    isSelected
  };
}
