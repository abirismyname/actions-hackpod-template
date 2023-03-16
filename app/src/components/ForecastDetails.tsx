import { useContext } from 'react';
import { BsWind, BsWater } from 'react-icons/bs';
import { TbSunrise, TbSunset } from 'react-icons/tb';
import { CurrentWeatherContext } from '../App';

export default function ForecastDetails() {
  const { currentWeather } = useContext(CurrentWeatherContext);
  return (
    <div className="bg-white px-10 py-10 rounded-[20px] border border-[#D3D9E8] grid grid-cols-2 gap-y-14 mb-10">
      <div className="flex items-center">
        <div className="mr-[10px]">
          <BsWind className="drop-shadow-lg" size={'1.8rem'} />
        </div>
        <div className="flex flex-col">
          <p>Wind Speed</p>
          <p className="font-bold">{`${currentWeather.daily.windspeed_10m_max[0]} ${currentWeather.daily_units.windspeed_10m_max}`}</p>
        </div>
      </div>
      <div className="flex items-center justify-end">
        <div className="mr-[10px]">
          <TbSunrise className="drop-shadow-lg" size={'1.8rem'} />
        </div>
        <div className="flex flex-col">
          <p>Sunrise</p>
          <p className="font-bold">
            {currentWeather.daily.sunrise[0].split('T')[1]}
          </p>
        </div>
      </div>
      <div className="flex items-center">
        <div className="mr-[10px]">
          <BsWater className="drop-shadow-lg" size={'1.8rem'} />
        </div>
        <div className="flex flex-col">
          <p>Precipation</p>
          <p className="font-bold">
            {`${currentWeather.daily.precipitation_sum[0]}${currentWeather.daily_units.precipitation_sum}`}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-end">
        <div className="mr-[10px]">
          <TbSunset className="drop-shadow-lg" size={'1.8rem'} />
        </div>
        <div className="flex flex-col">
          <p>Sunset</p>
          <p className="font-bold">
            {currentWeather.daily.sunset[0].split('T')[1]}
          </p>
        </div>
      </div>
    </div>
  );
}
