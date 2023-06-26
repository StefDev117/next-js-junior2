// MonComposant.js
import React, { useContext, useState } from 'react';
import MyContext from './Context/MyContext';

function TestJsxContext() {
  const { data, updateData } = useContext(MyContext);
  const [user, setUser] = useState("juuj");
  const handleClick = () => {
    updateData(user);
  };

  return (
    <div>
      <p>Données : {data}</p>
      <button onClick={() => setUser("stephane")}>user stephane</button>
      <button onClick={handleClick} style={{background: "red"}}>Modifier les données</button>
    </div>
  );
}

export default TestJsxContext;