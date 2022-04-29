import { Button, Form } from 'react-bootstrap';
import React, { useContext, useState, useEffect } from 'react';
import MyContext from '../context/MyContext';
import { filterPlanets } from '../helpers';
import Filters from './Filters';

function Header() {
  const {
    store: {
      setNameFilter,
      filters: { filterByNumericValues },
      setFilters,
      setFilteredPlanets,
      planets,
    },
  } = useContext(MyContext);
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState(0);
  const [columnOptions, setColumnOptions] = useState(['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water']);
  const operators = ['maior que', 'menor que', 'igual a'];

  const handleClick = () => {
    setFilters({
      filterByNumericValues: [...filterByNumericValues,
        { column, comparison, value }],
    });
    setColumnOptions(columnOptions.filter((c) => c !== column));
  };

  useEffect(() => {
    setFilteredPlanets(filterPlanets(planets, filterByNumericValues));
  }, [filterByNumericValues]);

  useEffect(() => {
    setColumn(columnOptions[0]);
  }, [columnOptions]);

  return (
    <section className="headerForm">
      <div>
        <input
          type="text"
          onChange={({ target }) => setNameFilter({
            filterByName:
          { name: target.value.toLowerCase() },
          })}
        />
      </div>
      <Form>
        <Form.Select
          onChange={({ target }) => setColumn(target.value)}
        >
          {columnOptions.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </Form.Select>
        <Form.Select
          onChange={(({ target }) => setComparison(target.value))}
        >
          {operators.map((op) => (
            <option key={op}>{op}</option>
          ))}
        </Form.Select>
        <input
          type="number"
          onChange={({ target }) => setValue(target.value)}
        />
        <Button
          onClick={handleClick}
        >
          Filter
        </Button>
      </Form>
      {filterByNumericValues.map((filter) => (
        <Filters
          filter={filter}
          key={{ column }}
          columnOptions={columnOptions}
          setColumnOptions={setColumnOptions}
        />
      ))}
    </section>
  );
}

export default Header;
