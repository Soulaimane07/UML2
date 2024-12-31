import axios from "axios"
import { useEffect, useState } from "react";


export const generateRandomCoordinates = (elementWidth, elementHeight, canvasWidth, canvasHeight) => {
    const x = Math.random() * (canvasWidth - elementWidth);
    const y = Math.random() * (canvasHeight - elementHeight);
    return { x, y };
};


export const AddElement = (elements, setElements, type) => {
    let element;
    
    let classCode = { 
      id: elements.length + 1,
      type: 'class', // or 'interface', etc.
      x: generateRandomCoordinates(150, 80, window.innerWidth, window.innerHeight).x,
      y: generateRandomCoordinates(150, 80, window.innerWidth, window.innerHeight).y,
      width: 200,
      height: 80,
      name: `Class${+elements.length + 1}`,
      attributes: [],
      methods: [],
    };
  
    let interfaceCode = {
      id: elements.length + 1,
      type: 'interface', // or 'interface', etc.
      x: generateRandomCoordinates(150, 80, window.innerWidth, window.innerHeight).x,
      y: generateRandomCoordinates(150, 80, window.innerWidth, window.innerHeight).y,
      width: 200,
      height: 80,
      name: `Interface${+elements.length + 1}`,
      methods: [],
    };
  
    type === 'class' ? element = classCode : element = interfaceCode;
  
    setElements([...elements, element]);
  
    console.log("Element added");
}
  

export const SaveWork = (elements, connectors) => {
    const jsonData = JSON.stringify({ elements, connectors }, null, 2); // Convert to a JSON string
    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "canvas-work.json"; // Name of the downloaded file
    document.body.appendChild(link);
    link.click(); // Programmatically click the link to trigger the download
    document.body.removeChild(link); // Clean up the link element

    console.log("Work saved as JSON!");
};


export const uploadWork = (event, setElements, setConnectors) => {
    const file = event.target.files[0];
    
    if (!file) {
        console.log("No file selected");
        return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const data = JSON.parse(e.target.result); // Parse JSON
            setElements(data.elements); // Update the application state
            setConnectors(data.connectors); // Update the application state
            console.log("Work uploaded successfully:", data);
        } catch (error) {
            console.error("Error parsing JSON file:", error);
        }
    };

    reader.readAsText(file); // Read file as text
};







export const PostToBackend = (elements, connectors) => {
    axios.post("http://localhost:3002/projects", { elements, connectors })
        .then((res) => {
            console.log(res.data);
        })
}


export const GetProjects = (New) => {
    const [projects, setProjects] = useState([])

    useEffect(() => {
        axios.get("http://localhost:3002/projects")
            .then((res) => {
                setProjects(res.data)
            })
    }, [New])
    
    return projects
}












///////////// Generate code from UML diagram /////////////


export const generateAndExportCode = (jsonData, language) => {
    const convertVisibility = (visibility, lang) => {
        if (lang === "php") return visibility === "private" ? "private" : "public";
        if (visibility === "private") return "private";
        if (visibility === "protected") return "protected";
        return "public";
    };

    const generateCodeForElement = (element, connectors, lang) => {
        const isInterface = element.type === "interface";
        const classType = isInterface ? (lang === "php" ? "interface" : "interface") : "class";

        let code = `${lang === "php" ? "<?php\n" : ""}${classType} ${element.name}`;

        // Handle inheritance or implementation
        connectors.forEach((conn) => {
            if (conn.from === element.id.toString()) {
                const toElement = jsonData.elements.find((e) => e.id.toString() === conn.to);
                if (conn.type === "Inheritance" && !isInterface) {
                    code += ` extends ${toElement.name}`;
                } else if (conn.type === "Implementation" && isInterface) {
                    code += ` implements ${toElement.name}`;
                }
            }
        });

        code += " {\n";

        // Add attributes
        if (element.attributes) {
            element.attributes.forEach((attr) => {
                code += `  ${convertVisibility(attr.visibility, lang)} ${
                    lang === "php" ? "$" : ""
                }${attr.name}`;
                if (lang !== "python") code += `: ${attr.type}`;
                code += ";\n";
            });
        }

        // Add methods
        if (element.methods) {
            element.methods.forEach((method) => {
                const params = "()"; // Simplification: No parameters for now
                code += `  ${convertVisibility(method.visibility, lang)} ${
                    lang === "php" ? "function " : ""
                }${method.name}${params}`;
                if (lang !== "python") code += `: ${method.type}`;
                code += lang === "python" ? ":\n    pass\n" : " {}\n";
            });
        }

        code += "}\n";
        return code;
    };

    // Generate code for all elements
    let fullCode = "";
    jsonData.elements.forEach((element) => {
        fullCode += generateCodeForElement(element, jsonData.connectors, language);
        fullCode += "\n";
    });

    // Export code as a file
    const blob = new Blob([fullCode], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `generated-code.${language}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    console.log("Code generated and exported!");
};
