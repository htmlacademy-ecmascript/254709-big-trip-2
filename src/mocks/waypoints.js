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

const getRandomMonth = () => getRandomInt(1, 9);
const getRandomDay = () => getRandomInt(10, 25);
const getRandomStartHour = () => getRandomInt(10, 12);
const getRandomEndHour = () => getRandomInt(13, 17);
const getRandomMinutes = () => getRandomInt(10, 50);

const getRandomWaypoint = () => {
  const offersElement = getRandomArrayElement(mockOffers);
  const destinationElement = getRandomArrayElement(mockDestinations);
  const { type, offers } = offersElement;
  const offersIdType = offers.map((item) => item.id);
  const offersId = offersIdType.slice(0, getRandomInt(0, offers.length));
  const randomMonth = getRandomMonth();
  const randomDay = getRandomDay();
  const randomStartHour = getRandomStartHour();
  const randomEndHour = getRandomEndHour();
  const randomStartMinutes = getRandomMinutes();
  const randomEndMinutes = getRandomMinutes();

  return {
    id: uuidv4(),
    basePrice: getRandomInt(PriceRange.MIN, PriceRange.MAX),
    dateFrom: `2025-0${randomMonth}-${randomDay}T${randomStartHour}:${randomStartMinutes}:00.116Z`,
    dateTo: `2025-0${randomMonth}-${randomDay}T${randomEndHour}:${randomEndMinutes}:04.116Z`,
    destination: destinationElement.id,
    isFavorite: getRandomBoolean(),
    offersId,
    type,
  };
};

export { getRandomWaypoint, mockOffers, mockDestinations };

