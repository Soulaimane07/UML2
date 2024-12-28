import React from 'react'
import { Line } from 'react-konva'

function Connectors({connectors}) {
  return (
    connectors.map((connector, key)=>{
        <Line
         // key={connector.id}
            points={[50, 50, 10, 100]}
            stroke="black"
            strokeWidth={2}
            tension={0.5}
            lineCap="round"
            lineJoin="round"
        />
    })
  )
}

export default Connectors