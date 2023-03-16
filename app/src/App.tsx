import { createContext, useState } from 'react';
import ForecastDetails from './components/ForecastDetails';
import Header from './components/Header';
import Rainfall from './components/Rainfall';
import TemperatureCard from './components/TemperatureCard';
import WeatherCharts from './components/WeatherCharts';

export const CurrentWeatherContext = createContext<any>(null);
export const CurrentCityContext = createContext<any>(null);
export const ColorModeContext = createContext<any>(null);

function App() {
  const [currentWeather, setCurrentWeather] = useState<any>(null);
  const [currentCity, setCurrentCity] = useState<any>(null);
  const [colorMode, setColorMode] = useState<'dark' | 'light'>('light');
  return (
    <ColorModeContext.Provider value={{ colorMode, setColorMode }}>
      <CurrentCityContext.Provider value={{ currentCity, setCurrentCity }}>
        <CurrentWeatherContext.Provider
          value={{ currentWeather, setCurrentWeather }}
        >
          <div className="mx-8 sm:mx-16 md:mx-32 lg:mx-32 xl:mx-32 2xl:mx-64">
            <Header />
            {currentWeather ? (
              <main>
                <TemperatureCard />
                <div className="grid grid-cols-1 lg:grid-cols-10 h-[376px]">
                  <div className="flex flex-col flex-initial lg:mr-4 xl:mr-16 lg:col-span-4">
                    <ForecastDetails />
                    <Rainfall />
                  </div>
                  <div className="lg:col-span-6 max-h-full">
                    <WeatherCharts />
                  </div>
                </div>
              </main>
            ) : (
              <>
                <h2 className="dark:text-white">Select a city from search!</h2>
              </>
            )}
          </div>
        </CurrentWeatherContext.Provider>
      </CurrentCityContext.Provider>
    </ColorModeContext.Provider>
  );
}

export default App;
