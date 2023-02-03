import React from "react";
import PropTypes from "prop-types";

import "./Filter.css";

import { List } from "../List/List";
import { Controls } from "../Controls/Controls";

export const Filter = ({ wordsList }) => {
  const [wordsData, setWordsData] = React.useState(wordsList);

  const [isSort, setIsSort] = React.useState(false);
  const [filterValue, setFilterValue] = React.useState("");

  React.useEffect(() => {
    transformWordsList();
  }, [isSort, filterValue]);

  const transformWordsList = () => {
    let wordsListData = wordsList.slice();

    wordsListData = wordsListData.filter((word) => word.includes(filterValue));

    if (isSort) {
      wordsListData.sort();
    }

    setWordsData(wordsListData);
  };

  const sortOnChange = () => {
    setIsSort(!isSort);
  };

  const filterOnChange = (event) => {
    setFilterValue(event.target.value);
  };

  const resetOnClick = () => {
    setIsSort(false);
    setFilterValue("");
  };

  return (
    <div className="Content">
      <Controls
        isSort={isSort}
        sortOnChange={sortOnChange}
        filterValue={filterValue}
        filterOnChange={filterOnChange}
        resetOnClick={resetOnClick}
      />

      <List wordsList={wordsData} />
    </div>
  );
};

Filter.propTypes = {
  wordsList: PropTypes.arrayOf(PropTypes.string).isRequired,
};
