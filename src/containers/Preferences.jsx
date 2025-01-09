import RefreshRate from "../components/RefreshRate";
import CheckBox from "../components/CheckBox";

import React from 'react'

const preferences = ( {refreshRate, handleRefreshRateChange, selectedCategories, handleCategoryChange} ) => {
  return (
    <div style={{ marginBottom: "20px" }}>
        <h2>Preferences</h2>
        <RefreshRate refreshRate={refreshRate} handleRefreshRateChange={handleRefreshRateChange}/>
        <CheckBox selectedCategories={selectedCategories} handleCategoryChange={handleCategoryChange}/>
      </div>
  )
}

export default preferences