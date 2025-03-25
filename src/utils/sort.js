export const getSortByPrice = (waypointA, waypointB) => waypointB.basePrice - waypointA.basePrice;

export const getSortByDefault = (waypointA, waypointB) => {
  const dateFromA = new Date(waypointA.dateFrom);
  const dateFromB = new Date(waypointB.dateFrom);
  return dateFromA - dateFromB;
};

export const getSortByTime = (waypointA, waypointB) => {
  const durationA = (new Date(waypointA.dateTo)) - (new Date(waypointA.dateFrom));
  const durationB = (new Date(waypointB.dateTo)) - (new Date(waypointB.dateFrom));
  return durationB - durationA;
};
