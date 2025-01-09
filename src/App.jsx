import PreferencesProvider from "./contexts/prefProvider";
import { PreferencesContext } from "./contexts/prefContext";
import WeatherApp from "./containers/weatherApp";
import './styles/WeatherApp.css';

const App = () => (
  <PreferencesProvider value={PreferencesContext}>
    <WeatherApp />
  </PreferencesProvider>
);

export default App;
