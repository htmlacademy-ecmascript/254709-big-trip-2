import { getRandomInt, getRandomBoolean, getRandomArrayElement } from '../../src/utils/common.js';
import { v4 as uuidv4 } from 'uuid';
import { POINT_TYPES, CITIES } from '../const.js';
import { getMockOffers } from './offers.js';
import { getMockDestinations } from './destinations.js';


const mockOffers = getMockOffers(POINT_TYPES);
const mockDestinations = getMockDestinations(CITIES);

const PriceRange = {
  MIN: 100,
  MAX: 5000
};

const getRandomYear = () => getRandomInt(2021, 2025);
const getRandomMonth = () => getRandomInt(1, 4);

const getRandomWaypoint = () => {
  const offersElement = getRandomArrayElement(mockOffers);
  const destinationElement = getRandomArrayElement(mockDestinations);
  const { type, offers } = offersElement;
  const offersIdType = offers.map((item) => item.id);
  const offersId = offersIdType.slice(0, getRandomInt(0, offers.length));
  const randomYearFrom = getRandomYear();
  const randomYearTo = randomYearFrom + getRandomInt(0, 2);
  const randomMonthFrom = getRandomMonth();
  const randomMonthTo = randomMonthFrom + getRandomInt(0, 5);
  return {
    id: uuidv4(),
    basePrice: getRandomInt(PriceRange.MIN, PriceRange.MAX),
    dateFrom: `${randomYearFrom}-0${randomMonthFrom}-02T21:42:04.116Z`,
    dateTo: `${randomYearTo}-0${randomMonthTo}-10T21:42:04.116Z`,
    destination: destinationElement.id,
    isFavorite: getRandomBoolean(),
    offersId,
    type,
  };
};

export { getRandomWaypoint, mockOffers, mockDestinations };

