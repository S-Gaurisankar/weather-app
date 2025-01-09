import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  createContext,
  useContext,
} from "react";

// Create a context for preferences
const PreferencesContext = createContext();

const usePreferences = () => useContext(PreferencesContext);

const PreferencesProvider = ({ children }) => {
  const [selectedCategories, setSelectedCategories] = useState(() => {
    const saved = localStorage.getItem("selectedCategories");
    return saved
      ? JSON.parse(saved)
      : {
          date: true,
          weather_code: true,
          temperature: true,
          sunrise: true,
          daylight: true,
          uv_index: true,
          precipitation: true,
          wind_speed: true,
        };
  });

  const [refreshRate, setRefreshRate] = useState(() => {
    const saved = localStorage.getItem("refreshRate");
    return saved ? Number(saved) : 60000; // Default refresh rate is 60 seconds
  });

  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved ? JSON.parse(saved) : false; // Default is light mode
  });

  // Save preferences to localStorage
  useEffect(() => {
    localStorage.setItem(
      "selectedCategories",
      JSON.stringify(selectedCategories)
    );
    localStorage.setItem("refreshRate", refreshRate.toString());
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [selectedCategories, refreshRate, darkMode]);

  return (
    <PreferencesContext.Provider
      value={{
        selectedCategories,
        setSelectedCategories,
        refreshRate,
        setRefreshRate,
        darkMode,
        setDarkMode,
      }}
    >
      {children}
    </PreferencesContext.Provider>
  );
};

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const {
    selectedCategories,
    setSelectedCategories,
    refreshRate,
    setRefreshRate,
    darkMode,
    setDarkMode,
  } = usePreferences();
  const intervalRef = useRef(null);

  // Fetch weather data
  const fetchWeather = async () => {
    try {
      const response = await fetch(
        "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&daily=weather_code,temperature_2m_max,sunrise,daylight_duration,uv_index_max,precipitation_sum,rain_sum,precipitation_hours,wind_speed_10m_max"
      );
      const data = await response.json();
      setWeatherData(data.daily);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  useEffect(() => {
    fetchWeather();

    // Set up periodic refresh
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(fetchWeather, refreshRate);

    return () => clearInterval(intervalRef.current); // Cleanup
  }, [refreshRate]);

  // Memoized filtered data
  const filteredData = useMemo(() => {
    if (!weatherData) return [];
    return weatherData.time.filter((date) =>
      date.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [weatherData, searchQuery]);

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const handleRefreshRateChange = (e) => {
    setRefreshRate(Number(e.target.value));
  };

  const handleDarkModeToggle = () => {
    setDarkMode((prev) => !prev);
  };

  // Handle loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Styles based on dark mode
  const themeStyles = {
    backgroundColor: darkMode ? "#333" : "#fff",
    color: darkMode ? "#fff" : "#000",
  };

  return (
    <div
      style={{
        ...themeStyles,
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1>Weather Forecast</h1>

      {/* Dark Mode Toggle */}
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

      {/* Preferences */}
      <div style={{ marginBottom: "20px" }}>
        <h2>Preferences</h2>
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
      </div>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search by date (e.g., 2025-01-01)"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{
          marginBottom: "20px",
          padding: "10px",
          width: "100%",
          fontSize: "16px",
          border: "1px solid #ddd",
          borderRadius: "4px",
        }}
      />

      {/* Weather Table */}
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            {selectedCategories.date && (
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Date</th>
            )}
            {selectedCategories.weather_code && (
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Weather Code
              </th>
            )}
            {selectedCategories.temperature && (
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Max Temp (°C)
              </th>
            )}
            {selectedCategories.sunrise && (
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Sunrise
              </th>
            )}
            {selectedCategories.daylight && (
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Daylight Duration
              </th>
            )}
            {selectedCategories.uv_index && (
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                UV Index
              </th>
            )}
            {selectedCategories.precipitation && (
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Precipitation (mm)
              </th>
            )}
            {selectedCategories.wind_speed && (
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Wind Speed (km/h)
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((date, index) => (
              <tr key={index}>
                {selectedCategories.date && (
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {date}
                  </td>
                )}
                {selectedCategories.weather_code && (
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {weatherData.weather_code[index]}
                  </td>
                )}
                {selectedCategories.temperature && (
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {weatherData.temperature_2m_max[index]}
                  </td>
                )}
                {selectedCategories.sunrise && (
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {weatherData.sunrise[index]}
                  </td>
                )}
                {selectedCategories.daylight && (
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {weatherData.daylight_duration[index]}
                  </td>
                )}
                {selectedCategories.uv_index && (
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {weatherData.uv_index_max[index]}
                  </td>
                )}
                {selectedCategories.precipitation && (
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {weatherData.precipitation_sum[index]}
                  </td>
                )}
                {selectedCategories.wind_speed && (
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {weatherData.wind_speed_10m_max[index]}
                  </td>
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
    </div>
  );
};

const App = () => (
  <PreferencesProvider>
    <WeatherApp />
  </PreferencesProvider>
);

export default App;
