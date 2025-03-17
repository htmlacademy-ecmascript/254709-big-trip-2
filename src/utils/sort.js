export const getSortByPrice = (a, b) => b.basePrice - a.basePrice;

export const getSortByDefault = (a, b) => {
  const dateFromA = new Date(a.dateFrom);
  const dateFromB = new Date(b.dateFrom);
  return dateFromA - dateFromB;
};


export const getSortByTime = (a, b) => {
  const durationA = (new Date(a.dateTo)) - (new Date(a.dateFrom));
  const durationB = (new Date(b.dateTo)) - (new Date(b.dateFrom));
  return durationB - durationA;
};
