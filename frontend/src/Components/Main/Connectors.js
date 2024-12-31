import React, { useEffect, useState } from 'react';

function Connectors({ connectors, elements }) {
  const [lines, setLines] = useState([]);

  useEffect(() => {
    const updatedLines = connectors.map((connector) => {
      const fromElement = elements.find((el) => Number(el.id) === Number(connector.from));
      const toElement = elements.find((el) => Number(el.id) === Number(connector.to));

      if (fromElement && toElement) {
        const { x: x1, y: y1 } = fromElement;
        const { x: x2, y: y2 } = toElement;

        return {
          id: connector.id,
          x1: x1 + 50, // Adjust offset as needed
          y1: y1 + 50, // Adjust offset as needed
          x2: x2 + 50,
          y2: y2 + 50,
          type: connector.type,
        };
      }
      return null;
    }).filter(Boolean);

    setLines(updatedLines);
  }, [connectors, elements]);

  return (
    <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
      {lines.map((line) => (
        <line
          key={line.id}
          x1={line.x1}
          y1={line.y1}
          x2={line.x2}
          y2={line.y2}
          stroke={line.type?.toLowerCase() === 'inheritance' ? 'blue' : line.type?.toLowerCase() === 'association' ? 'green' : 'red'}
          strokeWidth={2}
          markerEnd={
            line.type?.toLowerCase() === 'inheritance'
              ? 'url(#inheritanceArrow)'
              : line.type?.toLowerCase() === 'association'
              ? 'url(#associationArrow)'
              : 'url(#implementationArrow)'
          }
        />
      ))}
      <defs>
        <marker id="inheritanceArrow" markerWidth="10" markerHeight="10" refX="6" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="blue" />
        </marker>
        <marker id="associationArrow" markerWidth="10" markerHeight="10" refX="6" refY="3" orient="auto">
          <circle cx="3" cy="3" r="3" fill="green" />
        </marker>
        <marker id="implementationArrow" markerWidth="10" markerHeight="10" refX="6" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="red" />
        </marker>
      </defs>
    </svg>
  );
}

export default Connectors;
