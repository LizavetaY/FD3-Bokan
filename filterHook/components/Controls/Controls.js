import React from "react";
import PropTypes from "prop-types";

export const Controls = ({
  isSort,
  sortOnChange,
  filterValue,
  filterOnChange,
  resetOnClick,
}) => {
  return (
    <form>
      <input type="checkbox" checked={isSort} onChange={sortOnChange} />
      <input type="text" value={filterValue} onChange={filterOnChange} />
      <input type="button" value="Reset" onClick={resetOnClick} />
    </form>
  );
};

Controls.propTypes = {
  isSort: PropTypes.bool.isRequired,
  sortOnChange: PropTypes.func.isRequired,
  filterValue: PropTypes.string.isRequired,
  filterOnChange: PropTypes.func.isRequired,
  resetOnClick: PropTypes.func.isRequired,
};
