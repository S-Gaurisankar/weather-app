import React from 'react'

const DarkModeToggle = ( {darkMode, handleDarkModeToggle} ) => {
  return (
    <div>
           <button
        onClick={handleDarkModeToggle}
        style={{
          padding: "10px",
          marginBottom: "20px",
          backgroundColor: darkMode ? "#bbb" : "#333",
          color: darkMode ? "#000" : "#fff",
          border: "none",
          borderRadius: "4px",
        }}
      >
        {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
      </button>
    </div>
  )
}

export default DarkModeToggle