import React from 'react'

const CheckBox = ( {selectedCategories, handleCategoryChange} ) => {
  return (
    <div>
    {Object.keys(selectedCategories).map((category) => (
      <label key={category} style={{ marginRight: "15px" }}>
        <input
          type="checkbox"
          checked={selectedCategories[category]}
          onChange={() => handleCategoryChange(category)}
        />{" "}
        {category.charAt(0).toUpperCase() + category.slice(1)}
      </label>
    ))}
  </div>
  )
}

export default CheckBox