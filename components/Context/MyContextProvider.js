// MyContextProvider.js
import React, { useState } from 'react';
import MyContext from './MyContext';

function MyContextProvider({ children }) {
  const [data, setData] = useState('');

  const updateData = (newValue) => {
    setData(newValue);
  };

  const contextValue = {
    data,
    updateData,
  };

  return (
    <MyContext.Provider value={contextValue}>
      {children}
    </MyContext.Provider>
  );
}

export default MyContextProvider;