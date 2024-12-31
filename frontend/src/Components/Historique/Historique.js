import React from 'react'
import { GetProjects } from '../Functions';
import { IoClose } from "react-icons/io5";

function Historique({setShow, setElements, setConnectors}) {
    const projects = GetProjects()

  return (
    <div className='bg-gray-200 w-80 px-3 z-10 py-10 absolute h-screen right-0 top-0 shadow-gray-400 shadow-xl'>
      <div className='flex items-center justify-between mb-4'>
        <h1 className=' font-bold text-xl'> History </h1>
        <button onClick={()=> setShow(false)} className='flex items-center px-2 rounded-sm justify-end bg-transparent hover:bg-gray-300 py-1 transition-all'> <IoClose size={24} /> </button>
      </div>


      <ul className='space-y-2'>
          {projects.map((project, key) => (
              <button key={key} onClick={()=> setElements(project.elements) & setConnectors(project.connectors)} className='w-full flex items-baseline justify-between rounded-sm text-left bg-gray-300 py-2 px-4 hover:bg-gray-400 transition-all'> 
                <span> Project {key+1} </span> 
                <span className='opacity-60'> ({project?.elements?.length}) </span>
              </button>
          ))}
      </ul>
    </div>
  )
}

export default Historique