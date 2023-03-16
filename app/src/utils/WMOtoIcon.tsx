import {
  BsSun,
  BsCloud,
  BsCloudFog2,
  BsCloudDrizzle,
  BsCloudRain,
  BsCloudRainHeavy,
  BsCloudSnow,
  BsSnow,
  BsSnow2,
  BsCloudLightningRain,
} from 'react-icons/bs';
import { RiSunFoggyFill } from 'react-icons/ri';
import { GiHeavyRain } from 'react-icons/gi';

const WMODictionary: { [key: number]: JSX.Element } = {
  0: <BsSun className="drop-shadow-lg" size={'64px'} />,
  1: <RiSunFoggyFill className="drop-shadow-lg" size={'64px'} />,
  2: <RiSunFoggyFill className="drop-shadow-lg" size={'64px'} />,
  3: <BsCloud className="drop-shadow-lg" size={'64px'} />,
  45: <BsCloudFog2 className="drop-shadow-lg" size={'64px'} />,
  48: <BsCloudFog2 className="drop-shadow-lg" size={'64px'} />,
  51: <BsCloudDrizzle className="drop-shadow-lg" size={'64px'} />,
  53: <BsCloudDrizzle className="drop-shadow-lg" size={'64px'} />,
  55: <BsCloudDrizzle className="drop-shadow-lg" size={'64px'} />,
  56: <BsCloudDrizzle className="drop-shadow-lg" size={'64px'} />,
  57: <BsCloudDrizzle className="drop-shadow-lg" size={'64px'} />,
  61: <BsCloudRain className="drop-shadow-lg" size={'64px'} />,
  63: <BsCloudRain className="drop-shadow-lg" size={'64px'} />,
  65: <BsCloudRainHeavy className="drop-shadow-lg" size={'64px'} />,
  66: <BsCloudRain className="drop-shadow-lg" size={'64px'} />,
  67: <BsCloudRainHeavy className="drop-shadow-lg" size={'64px'} />,
  71: <BsCloudSnow className="drop-shadow-lg" size={'64px'} />,
  73: <BsCloudSnow className="drop-shadow-lg" size={'64px'} />,
  75: <BsSnow className="drop-shadow-lg" size={'64px'} />,
  77: <BsSnow className="drop-shadow-lg" size={'64px'} />,
  80: <GiHeavyRain className="drop-shadow-lg" size={'64px'} />,
  81: <GiHeavyRain className="drop-shadow-lg" size={'64px'} />,
  82: <GiHeavyRain className="drop-shadow-lg" size={'64px'} />,
  85: <BsSnow2 className="drop-shadow-lg" size={'64px'} />,
  86: <BsSnow2 className="drop-shadow-lg" size={'64px'} />,
  95: <BsCloudLightningRain className="drop-shadow-lg" size={'64px'} />,
  96: <BsCloudLightningRain className="drop-shadow-lg" size={'64px'} />,
};

export default function WMOToIcon(wmo: number): JSX.Element {
  return WMODictionary[wmo];
}
