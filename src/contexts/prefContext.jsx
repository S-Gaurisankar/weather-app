import { createContext, useContext } from "react";

const PreferencesContext = createContext();

const usePreferences = () => useContext(PreferencesContext);

export { PreferencesContext, usePreferences };
