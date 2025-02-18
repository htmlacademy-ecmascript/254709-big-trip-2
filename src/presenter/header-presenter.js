import { render, RenderPosition } from '../../src/framework/render.js';
import TripInfoView from '../view/trip-info-view/trip-info-view.js';
import FilterContentView from '../view/filter-list-view/filter-list-view.js';

export default class HeaderPresenter {
  #tripInfoContainer = null;
  #filtersListContainer = null;
  #tripInfoView = new TripInfoView();
  #filterListView = new FilterContentView({isViewList: true});
  #filterItemView = null;
  #filtersModel = null;

  constructor({ tripInfoContainer, filtersListContainer, filtersModel }) {
    this.#tripInfoContainer = tripInfoContainer;
    this.#filtersListContainer = filtersListContainer;
    this.#filtersModel = filtersModel;
  }

  init() {
    this.#renderTripInfo();
    this.#renderAllFilters();
  }

  #renderTripInfo() {
    render(this.#tripInfoView, this.#tripInfoContainer, RenderPosition.AFTERBEGIN);

  }

  #renderAllFilters() {
    render(this.#filterListView, this.#filtersListContainer);

    const allFilters = [...this.#filtersModel.allFilters];
    allFilters.forEach((filter) => {
      this.#renderFilter(filter);
    });
  }

  #renderFilter(filter) {
    const { id, name, value, checked } = filter;
    this.#filterItemView = new FilterContentView({
      id,
      name,
      value,
      checked,
      isViewList: false});
    render(this.#filterItemView, this.#filterListView.element);
  }
}
