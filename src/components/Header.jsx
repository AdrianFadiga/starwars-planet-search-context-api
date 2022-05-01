import { Button, Form } from 'react-bootstrap';
import React, { useContext, useState, useEffect } from 'react';
import MyContext from '../context/MyContext';
import { filterPlanets, orderPlanets } from '../helpers';
import Filters from './Filters';
import style from './Header.module.css';
import starWarsPng from '../images/starWars.png';

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
    <section className={style.headerForm}>
      <div className={style.nameFilter}>
        <label htmlFor="nameFilter">
          <img src={starWarsPng} alt="xablau" width="250px" />
          <br />
          <input
            id="nameFilter"
            type="text"
            onChange={({ target }) => setNameFilter({
              filterByName:
          { name: target.value.toLowerCase() },
            })}
          />
        </label>
      </div>
      <div className={style.formAndFilterContainer}>
        <Form className={style.formContainer}>
          <label htmlFor="column">
            Column
            <Form.Select
              id="column"
              className={style.select}
              size="sm"
              onChange={({ target }) => setColumn(target.value)}
            >
              {columnOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </Form.Select>
          </label>
          <label htmlFor="comparison">
            Comparison
            <Form.Select
              id="comparison"
              className={style.select}
              size="sm"
              onChange={(({ target }) => setComparison(target.value))}
            >
              {operators.map((op) => (
                <option key={op}>{op}</option>
              ))}
            </Form.Select>
          </label>
          <Form.Label
            htmlFor="value"
            className={style.inputLabel}
          >
            Value
            <Form.Control
              id="value"
              size="sm"
              type="number"
              onChange={({ target }) => setValue(target.value)}
            />
          </Form.Label>
          <Button
            variant="outline-warning"
            size="sm"
            onClick={handleClick}
            disabled={isDisabled}
          >
            Filter
          </Button>
          <Button
            variant="outline-warning"
            size="sm"
            onClick={() => {
              setFilters({ filterByNumericValues: [] });
              setColumnOptions(initialColumnOptions);
            }}
          >
            Remover Filtros
          </Button>
        </Form>
        <Form className={style.filterContainer}>
          <Form.Label
            htmlFor="sortColumn"
            className={style.inputLabel}
          >
            Order by
            <Form.Select
              id="sortColumn"
              size="sm"
              className={style.select}
              onChange={({ target }) => setSortColumn(target.value)}
            >
              {initialColumnOptions.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </Form.Select>
          </Form.Label>
          <div className={style.sortOrder}>
            <Form.Check
              type="radio"
              name="radio"
              value="Ascendent"
              onChange={({ target }) => setSortOrder(target.value)}
              label="Ascendent"
              checked={sortOrder === 'Ascendent'}
            />
            <Form.Check
              type="radio"
              name="radio"
              value="Descendent"
              onChange={({ target }) => setSortOrder(target.value)}
              label="Descendent"
            />
          </div>
          <Button
            variant="outline-warning"
            size="sm"
            onClick={() => setOrderBy({ order: { column: sortColumn, sort: sortOrder } })}
          >
            Ordenar
          </Button>
        </Form>
      </div>
      <div className={style.filtersContainer}>
        {filterByNumericValues.map((filter) => (
          <Filters
            filter={filter}
            key={{ column }}
            columnOptions={columnOptions}
            setColumnOptions={setColumnOptions}
          />
        ))}
      </div>
    </section>
  );
}

export default Header;
