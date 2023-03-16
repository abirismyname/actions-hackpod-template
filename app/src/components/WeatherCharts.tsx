import { BsFillSquareFill } from 'react-icons/bs';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { CurrentWeatherContext } from '../App';
import { useContext } from 'react';

export default function WeatherCharts() {
  const { currentWeather } = useContext(CurrentWeatherContext);
  const options: Highcharts.Options = {
    title: {
      text: '',
    },
    xAxis: {
      categories: currentWeather.hourly.time.map(
        (timestamp: string) => timestamp.split('T')[1]
      ),
    },
    yAxis: {
      title: {
        text: undefined,
      },
    },
    series: [
      {
        name: 'Temperature',
        type: 'line',
        tooltip: {
          valueSuffix: currentWeather.hourly_units.temperature_2m,
        },
        data: currentWeather.hourly.temperature_2m,
      },
      {
        name: 'Precipitation',
        type: 'line',
        tooltip: {
          valueSuffix: currentWeather.hourly_units.precipitation,
        },
        data: currentWeather.hourly.precipitation,
      },
      {
        name: 'Wind',
        type: 'line',
        tooltip: {
          valueSuffix: currentWeather.hourly_units.windspeed_10m,
        },
        data: currentWeather.hourly.windspeed_10m,
      },
    ],
    chart: {
      type: 'column',
      style: { height: 300 },
    },
  };

  return (
    <div className="min-h-full bg-white px-10 py-3 rounded-[20px] border border-[#D3D9E8] flex flex-col">
      <div className="flex items-center mb-2">
        <WeatherHeader />
      </div>
      <div className="w-full h-full mb-2">
        <HighchartsReact
          containerProps={{ style: { height: '100%' } }}
          highcharts={Highcharts}
          options={options}
        />
      </div>
    </div>
  );
}

function WeatherHeader() {
  return (
    <>
      <p>Temperature</p>
      <BsFillSquareFill size={'5px'} className="mx-2 text-[#D9D9D9]" />
      <p>Precipation</p>
      <BsFillSquareFill size={'5px'} className="mx-2 text-[#D9D9D9]" />
      <p>Wind</p>
    </>
  );
}
