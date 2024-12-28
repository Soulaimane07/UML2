import React from 'react'

function ElementAttributes({element, editing, setHoveredElement, hoveredElement, visibilityOptions, typeOptions, inputRef, inputValue, setInputValue, handleStartEditing}) {
  return (
    element?.attributes?.map((attribute, index) => (
        <div key={`attribute-${index}`} style={{ fontSize: "12px", marginBottom: "5px" }}>
          {editing && editing.type === "attribute" && editing.index === index ? (
            <div >
              <select
                value={attribute.visibility}
                onChange={(e) => {
                  const updatedAttribute = { ...attribute, visibility: e.target.value };
                  hoveredElement.attributes[index] = updatedAttribute;
                  setHoveredElement({ ...hoveredElement });
                }}
              >
                {visibilityOptions.map((visibility) => (
                  <option key={visibility} value={visibility}>
                    {visibility}
                  </option>
                ))}
              </select>
              <select
                value={attribute.type}
                onChange={(e) => {
                  const updatedAttribute = { ...attribute, type: e.target.value };
                  hoveredElement.attributes[index] = updatedAttribute;
                  setHoveredElement({ ...hoveredElement });
                }}
              >
                {typeOptions.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="-ml-0.5 w-full bg-gray-400"
                style={{
                  fontSize: "12px",
                  outline: "none",
                  zIndex: 1000,
                }}
              />
            </div>
          ) : (
            <span
              className="w-full"
              onDoubleClick={(e) =>
                handleStartEditing(
                  "attribute",
                  index,
                  attribute.name,
                  e.clientX,
                  e.clientY,
                  element
                )
              }
            >
              {`${attribute.visibility} ${attribute.name}: ${attribute.type}`}
            </span>
          )}
        </div>
      ))
  )
}

export default ElementAttributes