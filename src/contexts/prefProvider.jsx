import React, { useState, useEffect } from "react";

import { PreferencesContext } from "./prefContext";
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

export default PreferencesProvider;
