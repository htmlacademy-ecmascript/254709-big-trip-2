import { getRandomInt, getRandomArrayElement } from '../util';
import { v4 as uuidv4 } from 'uuid';
import { DESCRIPTION, PHOTO } from '../const';

const MAX_PHOTO_QTY = 5;
const PhotoIdRange = {
  MIN: 1,
  MAX: 100,
};

const getMockDestination = (array) => {
  const destinationMocks = [];

  const getRandomPhoto = () => ({
    src: `${PHOTO}${getRandomInt(PhotoIdRange.MIN, PhotoIdRange.MAX)}`,
    description: getRandomArrayElement(DESCRIPTION),
  });

  for (let i = 0; i < array.length; i++) {
    const arr = {
      id: uuidv4(),
      description: getRandomArrayElement(DESCRIPTION),
      name: array[i],
      pictures: Array.from({ length: getRandomInt(0, MAX_PHOTO_QTY) }, getRandomPhoto),
    };

    destinationMocks.push(arr);
  }
  return destinationMocks;
};

export { getMockDestination };

