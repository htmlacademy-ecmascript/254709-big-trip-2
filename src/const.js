export const POINT_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

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

export const FilterType = {
  EVERYTHING: 'EVERYTHING',
  FUTURE: 'FUTURE',
  PRESENT: 'PRESENT',
  PAST: 'PAST',
};

export const EventMsg = {
  EVERYTHING: 'Click New Event to create your first point',
  FUTURE: 'There are no future events now',
  PRESENT: 'There are no present events now',
  PAST: 'There are no past events now',
  LOADING: 'Loading...',
  ERROR: 'Failed to load latest route information',
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

export const TimeLimit = {
  LOWER: 100,
  UPPER: 1000,
};
