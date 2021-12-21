import React from "react";
import PropTypes from "prop-types";

export default function Filter({ filter, onChangeFilter }) {
  return (
    <div>
      Find contacts by name
      <input
        type="text"
        name="filter"
        value={filter}
        onChange={onChangeFilter}
      />
    </div>
  );
}

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  onChangeFilter: PropTypes.func.isRequired,
};
