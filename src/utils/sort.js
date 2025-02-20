export const getSortbyPrice = (a, b) => b.basePrice - a.basePrice;

export const getSortbyDefault = (a, b) => {
  const dateFromA = new Date(a.dateFrom);
  const dateFromB = new Date(b.dateFrom);
  return dateFromB - dateFromA;
};

export const getSortbyTime = (a, b) => {
  const durationA = (new Date(a.dateTo)) - (new Date(a.dateFrom));
  const durationB = (new Date(b.dateTo)) - (new Date(b.dateFrom));
  return durationB - durationA;
};
