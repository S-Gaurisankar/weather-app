import React from 'react'

const RefreshRate = ( {refreshRate, handleRefreshRateChange} ) => {
  return (
    <div>
    <label>
      Refresh Rate (ms):{" "}
      <input
        type="number"
        value={refreshRate}
        onChange={handleRefreshRateChange}
        style={{
          padding: "5px",
          margin: "5px",
          width: "100px",
        }}
      />
    </label>
  </div>
  )
}

export default RefreshRate