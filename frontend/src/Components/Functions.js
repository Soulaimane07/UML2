
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
      name: 'MyClass',
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
      name: 'Interface',
      methods: [],
    };
  
    type === 'class' ? element = classCode : element = interfaceCode;
  
    setElements([...elements, element]);
  
    console.log("Element added");
}
  

export const SaveWork = (elements) => {
    const jsonData = JSON.stringify(elements, null, 2); // Convert elements to a JSON string
    const blob = new Blob([jsonData], { type: "application/json" }); // Create a Blob object
    const url = URL.createObjectURL(blob); // Generate a download URL

    const link = document.createElement("a");
    link.href = url;
    link.download = "canvas-work.json"; // Name of the downloaded file
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link); // Clean up
    console.log("Work saved as JSON!");
}

export const uploadWork = (event, setElements) => {
    const file = event.target.files[0];
    
    if (!file) {
        console.log("No file selected");
        return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const data = JSON.parse(e.target.result); // Parse JSON
            setElements(data); // Update the application state
            console.log("Work uploaded successfully:", data);
        } catch (error) {
            console.error("Error parsing JSON file:", error);
        }
    };

    reader.readAsText(file); // Read file as text
};