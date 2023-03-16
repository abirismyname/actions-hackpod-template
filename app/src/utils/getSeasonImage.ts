interface modePicture {
  dark: string;
  light: string;
}

const seasonDictionary: { [key: string]: modePicture } = {
  winter: {
    dark: 'https://images.unsplash.com/photo-1673537226154-0cdb86867c6b',
    light: 'https://images.unsplash.com/photo-1601922646204-b02a2ee287b3',
  },
  spring: {
    dark: 'https://images.unsplash.com/photo-1554043098-58182a7ca8fe',
    light: 'https://images.unsplash.com/photo-1553525696-7885a8091d43',
  },
  summer: {
    dark: 'https://images.unsplash.com/photo-1460627390041-532a28402358',
    light: 'https://images.unsplash.com/photo-1531854838373-43e2435a0a6b',
  },
  autumn: {
    dark: 'https://images.unsplash.com/photo-1507237081139-5dfb209dba79',
    light: 'https://images.unsplash.com/photo-1575030213334-dded0e22a704',
  },
};

const monthDictionary: { [key: string]: modePicture } = {
  January: seasonDictionary.winter,
  February: seasonDictionary.winter,
  March: seasonDictionary.spring,
  April: seasonDictionary.spring,
  May: seasonDictionary.spring,
  June: seasonDictionary.summer,
  July: seasonDictionary.summer,
  August: seasonDictionary.summer,
  September: seasonDictionary.autumn,
  October: seasonDictionary.autumn,
  November: seasonDictionary.autumn,
  December: seasonDictionary.winter,
};

export default function getSeasonImage(season: string): modePicture {
  return monthDictionary[season];
}
