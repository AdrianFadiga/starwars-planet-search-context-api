import React from 'react';
import MyProvider from './context/MyProvider';
import Planets from './pages/Planets';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <MyProvider>
      <Planets />
    </MyProvider>
  );
}

export default App;
