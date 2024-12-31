import React from 'react';
import Elements from './Elements';
import Connectors from './Connectors';

function Main({ elements, connectors, setElements }) {
  return (
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
      <Elements initialElements={elements} setElements={setElements} />
      <Connectors connectors={connectors} elements={elements} />
    </div>
  );
}

export default Main;
