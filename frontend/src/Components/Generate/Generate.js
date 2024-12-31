import React, { useState } from 'react'
import { IoClose } from 'react-icons/io5'
import { generateAndExportCode } from '../Functions';

function Generate({setShowGenerate, elements, connectors}) {
    const langs = [
        {
            "title": "Java",
            "subtitle": "java",
            "image": "/images/java.png"
        },
        {
            "title": "Python",
            "subtitle": "python",
            "image": "/images/python.png"
        },
        {
            "title": "PHP",
            "subtitle": "php",
            "image": "/images/web.png"
        }
    ];

  return (
    <div className='fixed z-10 top-0 left-0 w-full h-screen flex items-center justify-center bg-black bg-opacity-35'>
        <div className='w-1/3 rounded-md  bg-white px-10 py-4'>
            <div className='flex items-start justify-between'>
                <h1 className=' font-bold text-3xl mb-6'> Generate Code </h1>
                <button onClick={()=> setShowGenerate(false)} className='mt-2 hover:bg-gray-600 hover:text-white rounded-md transition-all'> <IoClose size={28} /> </button>
            </div>
            <div className='flex flex-col'>
                {langs.map((item, key) => (
                    <button 
                        key={key} 
                        className={`space-x-4 rounded-md py-2 h-16 items-center flex px-8 hover:bg-black hover:bg-opacity-10`}
                        onClick={()=> generateAndExportCode({elements, connectors}, item.subtitle)}
                    >
                        <div className='w-10 h-full flex items-center'>
                            <img className='w-full h-fit object-contain' src={item.image} alt={`${item.title} icon`} />
                        </div>
                        <p>{item.title}</p>
                    </button>
                ))}
            </div>
        </div>
    </div>
  )
}

export default Generate