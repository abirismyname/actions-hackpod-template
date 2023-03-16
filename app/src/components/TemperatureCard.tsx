import { useContext } from 'react';
import {
  ColorModeContext,
  CurrentCityContext,
  CurrentWeatherContext,
} from '../App';
import decodeWMO from '../utils/decodeWMO';
import WMOToIcon from '../utils/WMOtoIcon';
import getSeasonImage from '../utils/getSeasonImage';

export default function TemperatureCard() {
  const { currentWeather } = useContext(CurrentWeatherContext);
  const { currentCity } = useContext(CurrentCityContext);
  const { colorMode } = useContext(ColorModeContext);
  const date = new Date();

  const time = `${date.toTimeString().split(':')[0]}:${
    date.toTimeString().split(':')[1]
  }`;
  const closestTimeIndex = currentWeather.hourly.time.indexOf(
    `${date.toISOString().split('T')[0]}T${time.split(':')[0]}:00`
  );
  const weekday = date.toLocaleDateString(undefined, { weekday: 'long' });
  const month = date.toLocaleDateString(undefined, { month: 'long' });
  const pic =
    colorMode === 'dark'
      ? getSeasonImage(month).dark
      : getSeasonImage(month).light;
  return (
    <div className="relative w-full h-80 mb-10">
      <img className="bg-card-blur object-cover" src={`${pic}`}></img>
      <img className="bg-card object-cover" src={`${pic}`}></img>
      <div className="card-size absolute card-center flex justify-between items-end pb-4 px-6 md:px-12 text-rich-black dark:text-white">
        <div className="flex flex-col">
          {WMOToIcon(currentWeather.hourly.weathercode[closestTimeIndex])}
          <p className="text-5xl lg:text-8xl">{`${Math.ceil(
            currentWeather.hourly.temperature_2m[closestTimeIndex]
          )}${currentWeather.hourly_units.temperature_2m}`}</p>
          <p className="mt-5 text-xl md:text-[1.75rem]">{`${currentCity.city}, ${currentCity.region}, ${currentCity.country}`}</p>
        </div>
        <div className="flex flex-col ">
          <p className="font-bold text-2xl md:text-[2rem] text-end">{time}</p>
          <p className="text-xl md:text-[1.75rem] text-end">{`${decodeWMO(
            currentWeather.hourly.weathercode[closestTimeIndex]
          )}, ${weekday}`}</p>
        </div>
      </div>
    </div>
  );
}
