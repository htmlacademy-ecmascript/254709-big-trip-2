export const POINT_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

export const CITIES = ['Amsterdam', 'Chamonix', 'Geneva', 'Paris', 'Berlin', 'Prague', 'Tokyo', 'Moscow', 'Saint-Petersburg'];

export const DESCRIPTION = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat.',
  'Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus.'
];

export const SortType = {
  DAY: {
    NAME: 'DAY',
    DISABLED: false,
  },
  EVENT: {
    NAME: 'EVENT',
    DISABLED: true,
  },
  TIME: {
    NAME: 'TIME',
    DISABLED: false,
  },
  PRICE: {
    NAME: 'PRICE',
    DISABLED: false,
  },
  OFFERS: {
    NAME: 'OFFERS',
    DISABLED: true,
  },
};

export const Mode = {
  VIEW: 'VIEW',
  EDITING: 'EDITING',
};

export const PHOTO = 'https://loremflickr.com/248/152?random=';

export const UserAction = {
  UPDATE_WAYPOINT: 'UPDATE_WAYPOINT',
  ADD_WAYPOINT: 'ADD_WAYPOINT',
  DELETE_WAYPOINT: 'DELETE_WAYPOINT',
};

export const UpdateType = {
  PATCH: 'PATCH',
  VIEW_CHANGE: 'VIEW_CHANGE',
  RESET_ALL: 'RESET_ALL',
};

export const FilterName = {
  EVERYTHING: 'EVERYTHING',
  FUTURE: 'FUTURE',
  PRESENT: 'PRESENT',
  PAST: 'PAST',
};

export const EventsMsg = {
  EVERYTHING: 'Click New Event to create your first point',
  FUTURE: 'There are no future events now',
  PRESENT: 'There are no present events now',
  PAST: 'There are no past events now',
};

export const FilterAction = {
  SET_FILTER: 'SET_FILTER',
  RESET_FILTER: 'RESET_FILTER',
};

export const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};
