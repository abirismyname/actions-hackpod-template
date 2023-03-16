import { useContext, useEffect } from 'react';
import { BsFillSunFill, BsFillMoonStarsFill } from 'react-icons/bs';
import Search from './Search';
import { ColorModeContext } from '../App';

export default function Header() {
  const { colorMode, setColorMode } = useContext(ColorModeContext);

  useEffect(() => {
    const color = colorMode === 'dark' ? '#020419' : '#e0e5ec';
    document.documentElement.classList.add(colorMode);
    document.documentElement.style.backgroundColor = color;

    return () => {
      document.documentElement.classList.remove(colorMode);
      document.documentElement.style.backgroundColor = '';
    };
  }, [colorMode]);

  const handleModeChange = () => {
    setColorMode(colorMode === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className="flex items-center justify-between my-10">
      <p className="text-3xl font-black text-slate-700 dark:text-white">Hello!</p>
      <div className="flex items-center">
        <Search />
        <div>
          {colorMode === 'dark' ? (
            <BsFillSunFill
              size={'1.75rem'}
              className="ml-3 md:ml-8 text-white cursor-pointer"
              onClick={handleModeChange}
            />
          ) : (
            <BsFillMoonStarsFill
              size={'1.5rem'}
              className="ml-3 md:ml-8 text-slate-700 cursor-pointer"
              onClick={handleModeChange}
            />
          )}
        </div>
      </div>
    </header>
  );
}
