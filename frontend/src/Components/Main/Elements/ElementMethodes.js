import React from 'react'

function ElementMethodes({element, editing, setHoveredElement, hoveredElement, visibilityOptions, typeOptions, inputRef, inputValue, setInputValue, handleStartEditing}) {
  return (
    element.methods.map((method, index) => (
        <div key={`method-${index}`} style={{ fontSize: "12px", marginBottom: "5px" }}>
          {editing && editing.type === "method" && editing.index === index ? (
            <div>
              <select
                value={method.visibility}
                onChange={(e) => {
                  const updatedMethod = { ...method, visibility: e.target.value };
                  hoveredElement.methods[index] = updatedMethod;
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
                value={method.type}
                onChange={(e) => {
                  const updatedMethod = { ...method, type: e.target.value };
                  hoveredElement.methods[index] = updatedMethod;
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
              onDoubleClick={(e) =>
                handleStartEditing(
                  "method",
                  index,
                  method.name,
                  e.clientX,
                  e.clientY,
                  element
                )
              }
            >
              {`${method.visibility} ${method.name}(): ${method.type}`}
            </span>
          )}
        </div>
      ))
  )
}

export default ElementMethodes