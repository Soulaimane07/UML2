import Button from "../Buttons/Button"

import { MdIndeterminateCheckBox } from "react-icons/md";
import { VscSymbolInterface } from "react-icons/vsc";
import { FaArrowRightLong } from "react-icons/fa6";
import { AddElement, SaveWork, uploadWork } from "../Functions";

import { MdOutlineFileDownload, MdOutlineFileUpload  } from "react-icons/md";
import { FaFileExport } from "react-icons/fa6";


const Toolbar = ({elements, setElements}) => {
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
                        <Button title="Association" icon={<FaArrowRightLong size={18} />} />
                        <Button title="Composition" icon={<FaArrowRightLong size={18} />} />
                        <Button title="Aggregation" icon={<FaArrowRightLong size={18} />} />
                        <Button title="Heritage" icon={<FaArrowRightLong size={18} />} />
                        <Button title="Implementation" icon={<FaArrowRightLong size={18} />} />
                    </div>
                </ul>

                <ul className=" px-4">
                    <Button title="Save work" icon={<MdOutlineFileDownload size={18} />} fun={()=> SaveWork(elements)} />
                    <Button title="Import Work" icon={<MdOutlineFileUpload size={18} />} fun={triggerFileInput} />
                    <input
                        type="file"
                        accept=".json"
                        onChange={(e)=> uploadWork(e, setElements)}
                        style={{ display: "none" }}
                        id="file-input"
                    />
                    <Button title="Generate Code" icon={<FaFileExport size={18} />} fun={null} />
                </ul>
            </div>
        </div>
    )
}

export default Toolbar;