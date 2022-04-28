import React from 'react';

function Filters({ filter: { column, value, comparison } }) {
  return (
    <div>
      <span>{`${column} ${comparison} ${value}`}</span>
      <button
        type="button"
      >
        x

      </button>
    </div>
  );
}

export default Filters;
