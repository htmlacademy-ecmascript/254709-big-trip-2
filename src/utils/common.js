const getRandomArrayElement = (items) => items[Math.floor(Math.random() * items.length)];

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const getRandomBoolean = () => Math.random() < 0.5;

function updateItem(items, update) {
  return items.map((item) => item.id === update.id ? update : item);
}

export { getRandomArrayElement, getRandomInt, getRandomBoolean, updateItem };
