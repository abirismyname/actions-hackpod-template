import { useContext } from 'react';
import { CurrentWeatherContext } from '../App';

export default function Rainfall() {
  const { currentWeather } = useContext(CurrentWeatherContext);
  return (
    <div className="bg-[#D3D9E8] dark:bg-[#5091BA] rounded-[20px] px-10 py-[23px] mb-10 lg:mb-0 drop-shadow-light dark:drop-shadow-dark">
      <div className="text-xl">
        <p>Daily Rainfall</p>
        <p className="font-bold">{`${currentWeather.daily.rain_sum}${currentWeather.daily_units.rain_sum}`}</p>
      </div>
    </div>
  );
}
