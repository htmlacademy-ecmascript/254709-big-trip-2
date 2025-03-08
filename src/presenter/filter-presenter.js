import { render } from '../framework/render.js';
import FilterListView from '../view/filter-list-view/filter-list-view.js';
import { FilterAction } from '../const.js';

export default class FilterPresenter {
  #filtersListContainer = null;
  #waypointsModel = null;
  #onFilterChange = null;
  #filterListComponent = null;
  #currentFilter = 'everything';
  #now = null;

  constructor({ filtersListContainer, waypointsModel, onFilterChange }) {
    this.#filtersListContainer = filtersListContainer;
    this.#waypointsModel = waypointsModel;
    this.#onFilterChange = onFilterChange;

    this.#waypointsModel.addObserver(this.#updateFilterAvailability);
  }

  init() {
    this.#renderFilterList();
    this.#updateFilterAvailability();
  }

  #renderFilterList = () => {
    this.#filterListComponent = new FilterListView();
    render(this.#filterListComponent, this.#filtersListContainer);
    this.#filterListComponent.element.addEventListener('click', this.#handleFilterClick);
  };

  getFilteredWaypoints = (type) => {
    this.#now = new Date();

    switch(type) {
      case 'EVERYTHING':
        return this.#waypointsModel.originalWaypoints;
      case 'FUTURE':
        return this.#waypointsModel.originalWaypoints.filter((waypoint) => new Date(waypoint.dateFrom) > this.#now);
      case 'PRESENT':
        return this.#waypointsModel.originalWaypoints.filter((waypoint) => (new Date(waypoint.dateFrom) <= this.#now) && (new Date(waypoint.dateTo) >= this.#now));
      case 'PAST':
        return this.#waypointsModel.originalWaypoints.filter((waypoint) => new Date(waypoint.dateTo) < this.#now);
    }
  };

  #updateFilterAvailability = () => {
    this.#now = new Date();

    const filters = this.#filterListComponent.element.querySelectorAll('.trip-filters__filter-input');
    const everythingFiltersQty = this.#waypointsModel.originalWaypoints.length;
    const futureFiltersQty = this.getFilteredWaypoints('FUTURE').length;
    const presentFiltersQty = this.getFilteredWaypoints('PRESENT').length;
    const pastFiltersQty = this.getFilteredWaypoints('PAST').length;

    // Установка состояний для фильтров на основе количества элементов
    filters.forEach((filter) => {
      switch(filter.value) {
        case 'everything':
          filter.disabled = everythingFiltersQty === 0;
          break;
        case 'future':
          filter.disabled = futureFiltersQty === 0;
          break;
        case 'present':
          filter.disabled = presentFiltersQty === 0;
          break;
        case 'past':
          filter.disabled = pastFiltersQty === 0;
          break;
      }
    });
  };

  #handleFilterClick = (evt) => {
    const filterInput = evt.target.closest('.trip-filters__filter-label');
    if (!filterInput) {
      return;
    }
    const filterInputId = filterInput.getAttribute('for');
    const inputElement = document.getElementById(`filter-${filterInputId}`);
    if (!filterInput || (inputElement && inputElement.disabled)) {
      return;
    }

    const filterValue = filterInput.getAttribute('for');

    if (this.#currentFilter === filterValue) {
      return;
    }

    const allInputs = this.#filterListComponent.element.querySelectorAll('.trip-filters__filter-input');
    allInputs.forEach((input) => {
      input.checked = input.id === `filter-${filterValue}`;
    });

    this.#currentFilter = filterValue;
    this.applyCurrentFilter(this.#currentFilter);
  };

  applyCurrentFilter(currentFilter) {
    this.#currentFilter = currentFilter;
    this.#onFilterChange(FilterAction.SET_FILTER, currentFilter);
  }

  getCurrentFilter() {
    return this.#currentFilter;
  }

  resetFilter() {
    this.#currentFilter = 'everything';
    const filters = this.#filterListComponent.element.querySelectorAll('.trip-filters__filter-input');
    filters.forEach((filter) => {
      filter.checked = filter.value === 'everything';
    });
    this.#updateFilterAvailability();

    this.#onFilterChange(FilterAction.RESET_FILTER);
  }
}
