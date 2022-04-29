import React, { useContext } from 'react';
import MyContext from '../context/MyContext';

function Filters({
  filter: { column, value, comparison },
  columnOptions, setColumnOptions,
}) {
  const {
    store: {
      filters: {
        filterByNumericValues,
      },
      setFilters,
    },
  } = useContext(MyContext);
  const handleClick = () => {
    setFilters({
      filterByNumericValues: filterByNumericValues
        .filter((f) => f.column !== column),
    });
    setColumnOptions([...columnOptions, column]);
  };
  return (
    <div>
      <span>{`${column} ${comparison} ${value}`}</span>
      <button
        type="button"
        onClick={handleClick}
      >
        x
      </button>
    </div>
  );
}

export default Filters;
