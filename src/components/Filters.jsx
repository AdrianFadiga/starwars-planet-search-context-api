import React, { useContext } from 'react';
import { MdOutlineRemoveCircle } from 'react-icons/md';
import MyContext from '../context/MyContext';
import style from './Filters.module.css';

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
    <div className={style.filter}>
      <span>{`${column} ${comparison} ${value}`}</span>
      <MdOutlineRemoveCircle
        className={style.removeButton}
        onClick={handleClick}
      />
    </div>
  );
}

export default Filters;
