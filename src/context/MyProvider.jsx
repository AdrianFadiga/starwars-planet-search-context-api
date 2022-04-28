import React, { useState, useEffect } from 'react';
import MyContext from './MyContext';

function MyProvider({ children }) {
  return (
    <MyContext.Provider value={{ store }}>
      {children}
    </MyContext.Provider>
  );
}

export default MyProvider;
