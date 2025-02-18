const filters = [
  {
    id: 'filter-everything',
    name: 'EVERYTHING',
    value: 'everything'
  },
  {
    id: 'filter-future',
    name: 'FUTURE',
    value: 'future'
  },
  {
    id: 'filter-present',
    name: 'PRESENT',
    value: 'present'
  },
  {
    id: 'filter-past',
    name: 'PAST',
    value: 'past'
  }
];

export default class FiltersModel {
  #allFilters = filters;

  get allFilters() {
    return this.#allFilters;
  }

  getDestinationById(id) {
    return this.#allFilters.find((item) => item.id === id);
  }
}
