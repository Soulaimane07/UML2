import React, { useEffect, useState } from 'react'
import { IoClose } from "react-icons/io5";


function SelectionBox({elements, connectors, setConnectors, showSelection, setShowSelection}) {

    const [from, setFrom] = useState(null)
    const [to, setTo] = useState(null)




   



    const addConnector = (fromId, toId, type = 'Association') => {
        const fromElement = elements.find(el => Number(el.id) === Number(fromId));
        const toElement = elements.find(el => Number(el.id) === Number(toId));
    
        if (!fromElement || !toElement) {
          console.error("Invalid element IDs for connector:", fromId, toId);
          return;
        }
    
        // Define connector points dynamically (basic horizontal line between elements)
        const points = [
          fromElement.x + fromElement.width / 2, // Start at the center of `fromElement`
          fromElement.y + fromElement.height / 2,
          toElement.x + toElement.width / 2, // End at the center of `toElement`
          toElement.y + toElement.height / 2,
        ];
    
        const newConnector = {
          id: `connector${connectors.length + 1}`,
          from: fromId,
          to: toId,
          type,
          points,
        };
    
        setConnectors([...connectors, newConnector]);
    };

    useEffect(()=> {
        if(from && to){
            addConnector(from, to, showSelection)
        }
    }, [from, to])

    
  return (
    <div className='fixed top-0 left-0 z-10 bg-black bg-opacity-35 justify-center items-center flex w-full h-screen'>
        <div className='w-1/3 rounded-md  bg-white px-10 py-4'>
            <div className='flex items-start justify-between'>
                <h1 className=' font-bold text-3xl mb-6'> {showSelection} </h1>
                <button onClick={()=> setShowSelection(null)} className='mt-2 hover:bg-gray-600 hover:text-white rounded-md transition-all'> <IoClose size={28} /> </button>
            </div>

            <div className="max-w-sm mx-auto mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-900 ">From</label>
                <select onChange={(e)=> setFrom(e.target.value)} id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
                    <option>Select an element</option>

                    {elements?.map((item, key) => {
                        const showForInheritance = showSelection === "Inheritance" && item?.type === "class";
                        const showForImplementation = showSelection === "Implementation" && item?.type === "interface";
                        const showForOtherCases = showSelection !== "Inheritance" && showSelection !== "Implementation";

                        if (showForInheritance || showForImplementation || showForOtherCases) {
                        return <option key={key} value={item.id}> {item.name} </option>;
                        }

                        return null;  // Nothing is rendered if the conditions are not met
                    })}
                </select>
            </div>
            
            <div className="max-w-sm mx-auto">
                <label className="block mb-2 text-sm font-medium text-gray-900">To</label>
                <select onChange={(e)=> setTo(e.target.value)} id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
                    <option>Select an element</option>
                    {elements?.map((item,key)=>(
                        <option key={key} value={item.id}> {item.name} </option>
                    ))}
                </select>
            </div>
        </div>
    </div>
  )
}

export default SelectionBox