import { Button, Form } from 'react-bootstrap';
import React, { useContext, useState } from 'react';
import MyContext from '../context/MyContext';
import { filterPlanets } from '../helpers';

function Header() {
  const {
    store: {
      setNameFilter,
      filters: { filterByNumericValues },
      setFilters,
      planets,
      filteredPlanets,
      setFilteredPlanets,
    },
  } = useContext(MyContext);
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState(0);
  const columnOptions = ['population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'];
  const operators = ['maior que', 'menor que', 'igual a'];

  const handleClick = () => {
    setFilters({
      filterByNumericValues: [...filterByNumericValues,
        { column, comparison, value }],
    });
    setFilteredPlanets(filterPlanets(filteredPlanets, { column, comparison, value }));
  };

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
    </section>
  );
}

export default Header;
