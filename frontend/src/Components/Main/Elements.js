import React, { useState, useRef } from "react";
import { CiSettings } from "react-icons/ci";
import { MdIndeterminateCheckBox } from "react-icons/md";
import { FaTrash } from "react-icons/fa6";
import ElementTitle from "./Elements/ElementTitle";
import ElementAttributes from "./Elements/ElementAttributes";
import ElementMethodes from "./Elements/ElementMethodes";

function Elements({ initialElements, setElements }) {
  const [hoveredElement, setHoveredElement] = useState(null);
  const [editing, setEditing] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef(null);

  const visibilityOptions = ["public", "private", "protected"];
  const typeOptions = ["int", "string", "boolean", "float", "Double"];

  const handleAddAttribute = () => {
    if (hoveredElement) {
      const newAttribute = {
        visibility: "private",  // Default visibility
        type: "string",       // Default type
        name: `Attribute${hoveredElement.attributes.length + 1}`,
      };
      hoveredElement.attributes.push(newAttribute);
      setHoveredElement({ ...hoveredElement });
    }
  };

  const handleAddMethod = () => {
    if (hoveredElement) {
      const newMethod = {
        visibility: "public",  // Default visibility
        type: "void",         // Default type (e.g., void for methods that return nothing)
        name: `Method${hoveredElement.methods.length + 1}`,
      };
      hoveredElement.methods.push(newMethod);
      setHoveredElement({ ...hoveredElement });
    }
  };

  const handleStartEditing = (type, index, value, x, y, element) => {
    const elementRect = document.getElementById(element.id).getBoundingClientRect();
    const offsetX = 10;
    const offsetY = 20 + index * 20;

    setEditing({
      type,
      index,
      elementRect,
      x: elementRect.left + offsetX,
      y: elementRect.top + offsetY,
    });
    setInputValue(value);

    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 0);
  };

  const handleSaveEdit = () => {
    if (editing && hoveredElement) {
      const { type, index } = editing;
      let updatedElement = { ...hoveredElement };

      if (type === "attribute") {
        updatedElement.attributes[index].name = inputValue;
      } else if (type === "method") {
        updatedElement.methods[index].name = inputValue;
      } else if (type === "title") {
        updatedElement.name = inputValue;
      }

      setHoveredElement(updatedElement);
    }
    setEditing(null);
  };

  const handleDeleteElement = () => {
    const updatedElements = initialElements.filter((element) => element.id !== hoveredElement.id);
    setElements(updatedElements);
    setHoveredElement(null);
    setInputValue("");
  };

  return (
    <>
      {initialElements.map((element, indexx) => {
        return (
          <div
            id={element.id}
            key={element.id}
            style={{
              position: "absolute",
              left: element.x,
              top: element.y,
              width: element.width,
              border: "2px solid black",
              borderRadius: "5px",
              backgroundColor: "white",
              padding: "10px",
              boxSizing: "border-box",
            }}
            onMouseEnter={() => setHoveredElement(element)}
          >
            <ElementTitle editing={editing} indexx={indexx} inputRef={inputRef} inputValue={inputValue} setInputValue={setInputValue} element={element} handleStartEditing={handleStartEditing} />
            <ElementAttributes editing={editing} element={element} inputRef={inputRef} setHoveredElement={setHoveredElement} hoveredElement={hoveredElement} typeOptions={typeOptions} visibilityOptions={visibilityOptions} inputValue={inputValue} setInputValue={setInputValue} handleStartEditing={handleStartEditing} />
            <ElementMethodes editing={editing} element={element} inputRef={inputRef} setHoveredElement={setHoveredElement} hoveredElement={hoveredElement} typeOptions={typeOptions} visibilityOptions={visibilityOptions} inputValue={inputValue} setInputValue={setInputValue} handleStartEditing={handleStartEditing} />
          </div>
        );
      })}

      {hoveredElement && (
        <div
          style={{
            position: "absolute",
            left: hoveredElement.x + 205,
            top: hoveredElement.y,
            padding: "3px",
            borderRadius: "5px",
            zIndex: 1000,
          }}
          className="bg-gray-200 border border-black"
          onMouseLeave={() => setHoveredElement(null)}
        >
          {hoveredElement.type === "class" && (
            <button
              className="hover:bg-gray-400 p-2 rounded-sm opacity-70"
              onClick={handleAddAttribute}
              title="Add Attribute"
            >
              <MdIndeterminateCheckBox size={18} />
            </button>
          )}
          <button
            className="hover:bg-gray-400 p-2 rounded-sm"
            onClick={handleAddMethod}
            title="Add Method"
          >
            <CiSettings size={18} />
          </button>
          <button
            className="hover:bg-gray-400 p-2 rounded-sm"
            onClick={handleDeleteElement}
            title="Delete"
          >
            <FaTrash size={14} />
          </button>
        </div>
      )}
    </>
  );
}

export default Elements;
