import Button from "../Buttons/Button"

import { MdIndeterminateCheckBox } from "react-icons/md";
import { VscSymbolInterface } from "react-icons/vsc";
import { FaArrowRightLong } from "react-icons/fa6";
import { AddElement, generateAndExportCode, PostToBackend, SaveWork, uploadWork } from "../Functions";

import { MdOutlineFileDownload, MdOutlineFileUpload  } from "react-icons/md";
import { FaFileExport } from "react-icons/fa6";
import { FaSave  } from "react-icons/fa";
import { GoHistory } from "react-icons/go";


const Toolbar = ({elements, connectors, setElements, setConnectors, setShow, setShowSelection, setShowGenerate}) => {
    const triggerFileInput = () => {
        document.getElementById("file-input").click(); // Trigger hidden file input
    };

    return (
        <div className="bg-green-900 w-80  h-screen py-6">
            {/* <h1 className="text-center text-white font-bold text-4xl"> UML </h1> */}

            <div className="flex flex-col justify-between h-full">
                <ul className="mt-6 px-4">
                    <>
                        <h2 className=" opacity-50 text-gray-100 mb-2"> Elements </h2>
                        <Button title="Class" icon={<MdIndeterminateCheckBox size={18} />}  fun={()=> AddElement(elements, setElements, 'class')} />
                        <Button title="Interface" icon={<VscSymbolInterface size={18} />} fun={()=> AddElement(elements, setElements, 'interface')} />
                    </>

                    <div className="mt-6">
                        <h2 className=" opacity-50 text-gray-100 mb-2"> Connectors </h2>
                        <Button title="Association" icon={<FaArrowRightLong size={18} />} fun={()=> setShowSelection("Association")} />
                        <Button title="Heritage" icon={<FaArrowRightLong size={18} />} fun={()=> setShowSelection("Inheritance")} />
                        <Button title="Implementation" icon={<FaArrowRightLong size={18} />} fun={()=> setShowSelection("Implementation")} />
                    </div>
                </ul>

                <ul className=" px-4">
                    <Button title="Save work" icon={<MdOutlineFileDownload size={18} />} fun={()=> SaveWork(elements, connectors)} />
                    <Button title="Import Work" icon={<MdOutlineFileUpload size={18} />} fun={triggerFileInput} />
                    <input
                        type="file"
                        accept=".json"
                        onChange={(e)=> uploadWork(e, setElements, setConnectors)}
                        style={{ display: "none" }}
                        id="file-input"
                    />
                    <Button title="Generate Code" icon={<FaFileExport size={18} />} fun={()=> setShowGenerate(true)} />
                    <Button title="Save" icon={<FaSave  size={18} />} fun={()=> PostToBackend(elements, connectors)} />
                    <Button title="History" icon={<GoHistory size={18} />} fun={()=> setShow(true)} />
                </ul>
            </div>
        </div>
    )
}

export default Toolbar;