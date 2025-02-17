import { render, RenderPosition } from '../../src/framework/render.js';
import TripInfoView from '../view/trip-info-view/trip-info-view.js';
import FilterListView from '../view/filter-list-view/filter-list-view.js';
export default class HeaderPresenter {
  #tripInfoContainer = null;
  #filterListContainer = null;
  #tripInfoView = new TripInfoView();
  #filterListView = new FilterListView();

  constructor({ tripInfoContainer, filterListContainer }) {
    this.#tripInfoContainer = tripInfoContainer;
    this.#filterListContainer = filterListContainer;
  }

  init() {
    this.#renderHeader();
  }

  #renderHeader() {
    render(this.#tripInfoView, this.#tripInfoContainer, RenderPosition.AFTERBEGIN);
    render(this.#filterListView, this.#filterListContainer);
  };

}
