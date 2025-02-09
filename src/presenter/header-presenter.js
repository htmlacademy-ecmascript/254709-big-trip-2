import { render, RenderPosition } from '../render.js';
import TripInfoView from '../view/trip-info-view.js';
import FilterListView from '../view/filter-list-view.js';
export default class HeaderPresenter {
  constructor({ tripInfoContainer, filterListContainer }) {
    this.tripInfoContainer = tripInfoContainer;
    this.filterListContainer = filterListContainer;
  }

  init() {
    render(new TripInfoView(), this.tripInfoContainer, RenderPosition.AFTERBEGIN);
    render(new FilterListView(), this.filterListContainer);
  }
}
