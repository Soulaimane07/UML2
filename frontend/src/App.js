import React, { useState } from 'react';

import Main from './Components/Main/Main';
import Toolbar from './Components/Toolbar/Toolbar'
import Historique from './Components/Historique/Historique';
import SelectionBox from './Components/Selections/SelectionBox';
import Generate from './Components/Generate/Generate';

function App() {

  const [elements, setElements] = useState([])
  const [connectors, setConnectors] = useState([]);

  const [Show, setShow] = useState(false)
  const [showSelection, setShowSelection] = useState(false)
  const [showgenerate, setShowGenerate] = useState(false)
  


  return (
    <div className="flex overflow-hidden">
      <Toolbar elements={elements} connectors={connectors} setElements={setElements} setConnectors={setConnectors} setShow={setShow} setShowSelection={setShowSelection} setShowGenerate={setShowGenerate} />
      <Main elements={elements} connectors={connectors} setElements={setElements} />


      {Show && <Historique setShow={setShow} setElements={setElements} setConnectors={setConnectors} />}
      {showSelection && <SelectionBox elements={elements} connectors={connectors} setConnectors={setConnectors} showSelection={showSelection} setShowSelection={setShowSelection} />}
      {showgenerate && <Generate setShowGenerate={setShowGenerate} elements={elements} connectors={connectors} />}
    </div>
  );
}

export default App;
