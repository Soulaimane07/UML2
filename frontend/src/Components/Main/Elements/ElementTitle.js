import React from 'react'

function ElementTitle({editing, indexx, inputRef, inputValue, setInputValue, element, handleStartEditing}) {
  return (
    editing && editing.index == indexx && editing.type === "title" ? (
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="-ml-0.5 w-full bg-gray-400 mb-2.5"
          style={{
            fontSize: "16px",
            outline: "none",
            zIndex: 1000,
          }}
        />
      ) : (
        <div
          style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "10px" }}
          onDoubleClick={(e) =>
            handleStartEditing("title", indexx, element?.name, e.clientX, e.clientY, element)
          }
        >
          {element?.name}
        </div>
    )
  )
}

export default ElementTitle