/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useState, useEffect } from 'react';
import MyContext from './MyContext';
import { fetchPlanets } from '../services';

function MyProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [nameFilter, setNameFilter] = useState({ filterByName: { name: '' } });
  const [filters, setFilters] = useState({ filterByNumericValues: [] });
  const [filteredPlanets, setFilteredPlanets] = useState([]);

  useEffect(() => {
    const setPlanetsEffect = async () => {
      const data = await fetchPlanets();
      setPlanets(data);
      setFilteredPlanets(data);
    };
    setPlanetsEffect();
  }, []);

  const store = {
    planets,
    nameFilter,
    setNameFilter,
    filters,
    setFilters,
    filteredPlanets,
    setFilteredPlanets,
  };

  return (
    <MyContext.Provider value={{ store }}>
      {children}
    </MyContext.Provider>
  );
}

export default MyProvider;
