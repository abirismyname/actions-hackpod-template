const WMOInterpretation: { [key: string]: number } = {
  'Clear sky': 0,
  'Mainly clear': 1,
  'Partly cloudy': 2,
  'Overcast': 3,
  'Fog': 45,
  'Depositing rime fog': 48,
  'Light drizzle': 51,
  'Moderate drizzle': 53,
  'Dense drizzle': 55,
  'Light freezing drizzle': 56,
  'Heavy freezing drizzle': 57,
  'Slight rain': 61,
  'Moderate rain': 63,
  'Heavy rain': 65,
  'Light freezing rain': 66,
  'Heavy freezing rain': 67,
  'Slight snow fall': 71,
  'Moderate snow fall': 73,
  'Heavy snow fall': 75,
  'Snow grains': 77,
  'Slight rain shower': 80,
  'Moderate rain shower': 81,
  'Violent rain shower': 82,
  'Light snow shower': 85,
  'Heavy snow shower': 86,
  'Thunderstorm': 95,
  'Hail thunderstorm': 96,
};

export default function decodeWMO(wmo: number) {
  return Object.keys(WMOInterpretation).find(
    (key) => WMOInterpretation[key] === wmo
  );
}
