export const defineComparison = (planets, filterObj) => {
  const { column, comparison, value } = filterObj;
  if (comparison === 'menor que') return planets.filter((planet) => Number(planet[column]) < Number(value));
  if (comparison === 'igual a') return planets.filter((planet) => Number(planet[column]) === Number(value));
  return planets.filter((planet) => Number(planet[column]) > Number(value));
};

export const filterPlanets = (planets, filterByNumericValues) => filterByNumericValues
  .reduce((acc, curr) => defineComparison(acc, curr), planets);
