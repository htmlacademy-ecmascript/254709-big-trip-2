import { getRandomInt, getRandomArrayElement } from '../../src/utils/common.js';
import { v4 as uuidv4 } from 'uuid';
import { DESCRIPTION, PHOTO } from '../const.js';

const MAX_PHOTO_QTY = 5;
const PhotoIdRange = {
  MIN: 1,
  MAX: 100,
};

const getMockDestinations = (array) => {
  const destinationsMocks = [];

  const getRandomPhotos = () => ({
    src: `${PHOTO}${getRandomInt(PhotoIdRange.MIN, PhotoIdRange.MAX)}`,
    description: getRandomArrayElement(DESCRIPTION),
  });

  for (let i = 0; i < array.length; i++) {
    const arr = {
      id: uuidv4(),
      description: getRandomArrayElement(DESCRIPTION),
      name: array[i],
      pictures: Array.from({ length: getRandomInt(0, MAX_PHOTO_QTY) }, getRandomPhotos),
    };

    destinationsMocks.push(arr);
  }
  return destinationsMocks;
};

export { getMockDestinations };

