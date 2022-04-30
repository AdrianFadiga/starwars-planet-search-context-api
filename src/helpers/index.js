export const defineComparison = (planets, filterObj) => {
  const { column, comparison, value } = filterObj;
  if (comparison === 'menor que') return planets.filter((planet) => Number(planet[column]) < Number(value));
  if (comparison === 'igual a') return planets.filter((planet) => Number(planet[column]) === Number(value));
  return planets.filter((planet) => Number(planet[column]) > Number(value));
};

export const filterPlanets = (planets, filterByNumericValues) => filterByNumericValues
  .reduce((acc, curr) => defineComparison(acc, curr), planets);

export const orderPlanets = (planets, column, sort) => {
  const unknownColumn = planets.filter((f) => f[column] === 'unknown');
  const notUnknownColumn = planets.filter((f) => f[column] !== 'unknown');
  if (sort === 'Ascendent') {
    return [...notUnknownColumn.sort((a, b) => Number(a[column])
    - Number(b[column])), ...unknownColumn];
  }
  return [...unknownColumn,
    ...notUnknownColumn.sort((a, b) => Number(b[column]) - Number(a[column]))];
};
