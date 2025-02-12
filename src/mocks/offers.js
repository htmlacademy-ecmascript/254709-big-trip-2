import { getRandomInt } from '../util';
import { v4 as uuidv4 } from 'uuid';

const PriceRange = {
  MIN: 100,
  MAX: 5000,
};

const MAX_OFFERS_QTY = 3;

const getMockOffers = (pointsArr) => {
  const offersMocks = [];
  let counter = 1;

  const getRandomOffers = () => ({
    title: `Offer's title ${counter++}`,
    price: getRandomInt(PriceRange.MIN, PriceRange.MAX),
    id: uuidv4(),
  });

  for (let i = 0; i < pointsArr.length; i++) {
    const arr = {
      type: pointsArr[i],
      price: getRandomInt(PriceRange.MIN, PriceRange.MAX),
      offers: Array.from(
        { length: getRandomInt(0, MAX_OFFERS_QTY) },
        getRandomOffers
      ),
    };

    offersMocks.push(arr);
  }
  return offersMocks;
};

export { getMockOffers };
