import React from "react";
import PropTypes from "prop-types";

import "./List.css";

export const List = ({ wordsList }) => {
  return (
    <div className="ListWrapper">
      <ul className="List">
        {wordsList.map((word, index) => (
          <li key={index}>{word}</li>
        ))}
      </ul>
    </div>
  );
};

List.propTypes = {
  wordsList: PropTypes.arrayOf(PropTypes.string).isRequired,
};
