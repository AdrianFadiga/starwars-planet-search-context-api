export const fetchPlanets = async () => {
  const data = await (await fetch('https://swapi-trybe.herokuapp.com/api/planets/')).json();
  return data.results;
};

export const xablau = () => {

};
