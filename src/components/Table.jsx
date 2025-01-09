import React from 'react'
import '../styles/WeatherApp.css'

const Table = ( {selectedCategories, filteredData, weatherData, searchQuery} ) => {
  return (
    <table className="weather-table">
      <thead>
        <tr>
          {selectedCategories.date && (
            <th>Date</th>
          )}
          {selectedCategories.weather_code && (
            <th>Weather Code</th>
          )}
          {selectedCategories.temperature && (
            <th>Max Temp (°C)</th>
          )}
          {selectedCategories.sunrise && (
            <th>Sunrise</th>
          )}
          {selectedCategories.daylight && (
            <th>Daylight Duration</th>
          )}
          {selectedCategories.uv_index && (
            <th>UV Index</th>
          )}
          {selectedCategories.precipitation && (
            <th>Precipitation (mm)</th>
          )}
          {selectedCategories.wind_speed && (
            <th>Wind Speed (km/h)</th>
          )}
        </tr>
      </thead>
      <tbody>
        {filteredData.length > 0 ? (
          filteredData.map((date, index) => (
            <tr key={index}>
              {selectedCategories.date && (
                <td>{date}</td>
              )}
              {selectedCategories.weather_code && (
                <td>{weatherData.weather_code[index]}</td>
              )}
              {selectedCategories.temperature && (
                <td>{weatherData.temperature_2m_max[index]}</td>
              )}
              {selectedCategories.sunrise && (
                <td>{weatherData.sunrise[index]}</td>
              )}
              {selectedCategories.daylight && (
                <td>{weatherData.daylight_duration[index]}</td>
              )}
              {selectedCategories.uv_index && (
                <td>{weatherData.uv_index_max[index]}</td>
              )}
              {selectedCategories.precipitation && (
                <td>{weatherData.precipitation_sum[index]}</td>
              )}
              {selectedCategories.wind_speed && (
                <td>{weatherData.wind_speed_10m_max[index]}</td>
              )}
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="8" style={{ textAlign: "center", padding: "10px" }}>
              No results found for "{searchQuery}"
            </td>
          </tr>
        )}
      </tbody>
    </table>
  )
}

export default Table