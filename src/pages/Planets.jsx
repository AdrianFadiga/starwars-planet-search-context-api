import React, { useContext } from 'react';
import Table from 'react-bootstrap/Table';
import MyContext from '../context/MyContext';
import Header from '../components/Header';

function Planets() {
  const {
    store: {
      filteredPlanets,
      nameFilter: {
        filterByName,
      },
    },
  } = useContext(MyContext);
  const tableHeader = ['Name', 'Rotation Period', 'Orbital Period',
    'Diameter', 'Climate', 'Gravity', 'Terrain',
    'Surface Water', 'Population', 'Films', 'Created', 'Edited', 'URL'];

  return (
    <section className="PlanetsTable">
      <Header />
      <Table>
        <thead>
          <tr>
            {tableHeader.map((th) => (
              <th key={th}>{th}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredPlanets
            .filter((f) => f.name.toLowerCase().includes(filterByName.name))
            .map(({
              name, rotation_period,
              orbital_period, diameter, climate,
              gravity, terrain, surface_water,
              population, films,
              created, edited, url,
            }) => (
              <tr key={name}>
                <th>{name}</th>
                <th>{rotation_period}</th>
                <th>{orbital_period}</th>
                <th>{diameter}</th>
                <th>{climate}</th>
                <th>{gravity}</th>
                <th>{terrain}</th>
                <th>{surface_water}</th>
                <th>{population}</th>
                <th>
                  <ul>
                    {films.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                </th>
                <th>{created}</th>
                <th>{edited}</th>
                <th>{url}</th>
              </tr>
            ))}
        </tbody>
      </Table>
    </section>
  );
}

export default Planets;
