import React, { useState } from 'react';

import Main from './Components/Main/Main';
import Toolbar from './Components/Toolbar/Toolbar'

function App() {

  const [elements, setElements] = useState([])

  console.log(elements);
  

  const [connectors, setConnectors] = useState([ 
      {
          id: 'connector-1',
          from: 'element-1', // ID of the source element
          to: 'element-2',   // ID of the destination element
          type: 'association',  // or 'dependency', 'inheritance'
      }
  ]);

  return (
    <div className="flex overflow-hidden">
      <Toolbar elements={elements} setElements={setElements} />
      <Main elements={elements} connectors={connectors} setElements={setElements} />
    </div>
  );
}

export default App;
