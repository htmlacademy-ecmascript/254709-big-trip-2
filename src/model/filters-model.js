const filters = [
  {
    id: 'filter-everything',
    name: 'EVERYTHING',
    value: 'everything',
    checked: true
  },
  {
    id: 'filter-future',
    name: 'FUTURE',
    value: 'future',
    checked: false
  },
  {
    id: 'filter-present',
    name: 'PRESENT',
    value: 'present',
    checked: false
  },
  {
    id: 'filter-past',
    name: 'PAST',
    value: 'past',
    checked: false
  }
];

export default class FiltersModel {
  #filters = filters;

  get allFilters() {
    return this.#filters;
  }

  getDestinationById(id) {
    return this.#filters.find((item) => item.id === id);
  }
}
