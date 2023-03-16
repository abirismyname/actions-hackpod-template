import { SetStateAction, useContext, useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';
import { CurrentCityContext, CurrentWeatherContext } from '../App';
import { GEO_API_URL, WEATHER_API_URL, geoApiOptions } from '../api';

interface SearchProps {
  onSearchChange: (searchData: string) => void;
}

interface Suggestion {
  city: string;
  country: string;
  countryCode: string;
  id: number;
  latitude: number;
  longitude: number;
  name: string;
  population: number;
  region: string;
  regionCode: string;
  type: string;
  wikiDataId: string;
}

export default function Search() {
  const [searchCity, setSearchCity] = useState<string>('');
  const [city, setCity] = useState<Suggestion | null>(null);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const { setCurrentCity } = useContext(CurrentCityContext);
  const { setCurrentWeather } = useContext(CurrentWeatherContext);

  const handleChange = (e: { target: { value: SetStateAction<string> } }) => {
    setSearchCity(e.target.value);
  };
  const handleClick = async (suggestion: Suggestion) => {
    setCity(suggestion);
    setCurrentCity(suggestion);
    setSearchCity('');
  };

  useEffect(() => {
    const loadWeather = async (city: Suggestion) => {
      const { latitude, longitude } = city;
      const date = new Date().toISOString().split('T')[0];
      const response = await axios.get(
        `${WEATHER_API_URL}?latitude=${latitude}&longitude=${longitude}&start_date=${date}&end_date=${date}&hourly=temperature_2m,precipitation,windspeed_10m,weathercode&timezone=EET&daily=sunset,sunrise,windspeed_10m_max,rain_sum,precipitation_sum`
      );
      setCurrentWeather(response.data);
    };
    if (city) loadWeather(city);
  }, [city]);

  useEffect(() => {
    const loadCities = async (searchCity: string) => {
      if (!searchCity) return;
      const response = await axios.request({
        url: `${GEO_API_URL}/cities?minPopulation=100000&namePrefix=${searchCity}`,
        ...geoApiOptions,
      });
      setSuggestions(response.data.data);
    };
    loadCities(searchCity);
  }, [searchCity]);

  return (
    <>
      <form className="flex items-center mr-4">
        <div className="relative flex items-center">
          <input
            value={searchCity}
            type="text"
            onChange={handleChange}
            className="p-2.5 pr-10 rounded-lg bg-transparent border border-slate-400 dark:border-[#e0e5ec] text-sm text-slate-600 dark:text-white shadow-sm focus:outline-none focus:border-slate-600 dark:focus:border-white placeholder:text-slate-400 dark:placeholder:text-[#e0e5ec]"
            placeholder="Enter city name"
          />
          <button
            type="submit"
            className="ml-[-2rem] text-slate-600 dark:text-[#e0e5ec] dark:hover:text-white"
          >
            <FaSearch />
          </button>
          <ul className="absolute bg-white top-11 z-10 w-full rounded-lg">
            {suggestions &&
              searchCity &&
              suggestions.map((suggestion, index) => (
                <li
                  className="pl-3 hover:cursor-pointer hover:bg-slate-100 first:hover:rounded-t-lg last:hover:rounded-b-lg"
                  key={index}
                  onClick={() => handleClick(suggestion)}
                >{`${suggestion.city}, ${suggestion.countryCode}`}</li>
              ))}
          </ul>
        </div>
      </form>
    </>
  );
}
