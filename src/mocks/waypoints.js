import { getRandomInt, getRandomBoolean, getRandomArrayElement } from '../util';
import { v4 as uuidv4 } from 'uuid';
import { POINT_TYPES, CITIES } from '../const';
import { getMockOffers } from './offers.js';
import { getMockDestination } from './destinations.js';

const mockOffersArray = getMockOffers(POINT_TYPES);
const mockDestinationArray = getMockDestination(CITIES);

const PriceRange = {
  MIN: 100,
  MAX: 5000
};

const getRandomWaypoint = () => {
  const offersElement = getRandomArrayElement(mockOffersArray);
  const destinationElement = getRandomArrayElement(mockDestinationArray);
  const { type, offers } = offersElement;
  const offersIdType = offers.map((item) => item.id);
  const offersId = offersIdType.slice(0, getRandomInt(0, offers.length));

  return {
    id: uuidv4(),
    basePrice: getRandomInt(PriceRange.MIN, PriceRange.MAX),
    dateFrom: '2024-02-02T21:42:04.116Z',
    dateTo: '2024-03-02T21:42:04.116Z',
    destination: destinationElement.id,
    favorite: getRandomBoolean(),
    offersId,
    type,
  };
};

export { getRandomWaypoint, mockOffersArray, mockDestinationArray };

