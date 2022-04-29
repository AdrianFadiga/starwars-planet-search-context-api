import { Button, Form } from 'react-bootstrap';
import React, { useContext, useState, useEffect } from 'react';
import MyContext from '../context/MyContext';
import { filterPlanets, orderPlanets } from '../helpers';
import Filters from './Filters';

function Header() {
  const {
    store: {
      setNameFilter,
      filters: { filterByNumericValues },
      setFilters,
      setFilteredPlanets,
      filteredPlanets,
      planets,
    },
  } = useContext(MyContext);
  const initialColumnOptions = ['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water'];
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);
  const [columnOptions, setColumnOptions] = useState(initialColumnOptions);
  const [sortColumn, setSortColumn] = useState('population');
  const [sortOrder, setSortOrder] = useState('Ascendent');
  const [orderBy, setOrderBy] = useState({ order: { column: 'population', sort: 'Ascendent' } });
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
    if (!columnOptions.length) return setIsDisabled(true);
    return setIsDisabled(false);
  }, [columnOptions]);

  useEffect(() => {
    const { order } = orderBy;
    setFilteredPlanets([...orderPlanets(filteredPlanets, order.column, order.sort)]);
  }, [orderBy]);

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
          disabled={isDisabled}
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
      <Button
        onClick={() => {
          setFilters({ filterByNumericValues: [] });
          setColumnOptions(initialColumnOptions);
        }}
      >
        Remover Filtros
      </Button>
      <Form>
        <Form.Select
          onChange={({ target }) => setSortColumn(target.value)}
        >
          {initialColumnOptions.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </Form.Select>
        {['Ascendent', 'Descendent'].map((r) => (
          <Form.Check
            key={r}
            type="radio"
            name="radio"
            value={r}
            onChange={({ target }) => setSortOrder(target.value)}
            label={r}
          />
        ))}
        <Button
          onClick={() => setOrderBy({ order: { column: sortColumn, sort: sortOrder } })}
        >
          Ordenar
        </Button>
      </Form>
    </section>
  );
}

export default Header;
