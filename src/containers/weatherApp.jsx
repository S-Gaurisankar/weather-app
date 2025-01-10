import { usePreferences } from "../contexts/prefContext";
import { useState, useEffect, useRef, useMemo } from "react";
import SearchBar from "../components/SearchBar";
import DarkModeToggle from "../components/DarkModeToggle";
import Preferences from "./Preferences";
import Table from "../components/Table";
import '../styles/WeatherApp.css';

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
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(fetchWeather, refreshRate);
    return () => clearInterval(intervalRef.current);
  }, [refreshRate]);

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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={`weather-container ${darkMode ? 'dark-mode' : ''}`}>
      <h1 className="weather-header">Weather Forecast</h1>
      <div className="preferences-section">
        <Preferences 
          refreshRate={refreshRate} 
          handleRefreshRateChange={handleRefreshRateChange}
          selectedCategories={selectedCategories}
          handleCategoryChange={handleCategoryChange}
        />
        <DarkModeToggle 
          darkMode={darkMode} 
          handleDarkModeToggle={handleDarkModeToggle}
        />
      </div>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Table 
        selectedCategories={selectedCategories}
        filteredData={filteredData}
        weatherData={weatherData}
        searchQuery={searchQuery}
      />
    </div>
  );
};

export default WeatherApp;
