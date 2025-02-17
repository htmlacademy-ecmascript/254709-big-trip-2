const getRandomArrayElement = (items) => items[Math.floor(Math.random() * items.length)];

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const getRandomBoolean = () => Math.random() < 0.5;

export { getRandomArrayElement, getRandomInt, getRandomBoolean };
