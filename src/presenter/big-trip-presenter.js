import { render, RenderPosition } from '../framework/render.js';
import TripInfoView from '../view/trip-info-view/trip-info-view.js';
import FilterContentView from '../view/filter-list-view/filter-list-view.js';
import WaypointListView from '../view/waypoint-list-view/waypoint-list-view.js';


export default class BigTripPresenter {
  #tripInfoContainer = null;
  #filtersListContainer = null;
  #tripInfoView = new TripInfoView();
  #filterListView = new FilterContentView({isViewList: true});
  #filterItemView = null;
  #filtersModel = null;
  #listContainer = null;
  #waypointListView = null;

  constructor({ tripInfoContainer, filtersListContainer, filtersModel, listContainer }) {
    this.#tripInfoContainer = tripInfoContainer;
    this.#filtersListContainer = filtersListContainer;
    this.#filtersModel = filtersModel;
    this.#listContainer = listContainer;
  }

  init() {
    this.#renderTripInfo();
    this.#renderAllFilters();
    this.#renderWaypointList();
  }

  #renderTripInfo = () => {
    render(this.#tripInfoView, this.#tripInfoContainer, RenderPosition.AFTERBEGIN);
  };

  #renderAllFilters = () => {
    render(this.#filterListView, this.#filtersListContainer);

    const allFilters = [...this.#filtersModel.allFilters];
    allFilters.forEach((filter) => {
      this.#renderFilter(filter);
    });
  };

  #renderFilter = (filter) => {
    const { id, name, value, checked } = filter;
    this.#filterItemView = new FilterContentView({
      id,
      name,
      value,
      checked,
      isViewList: false});
    render(this.#filterItemView, this.#filterListView.element);
  };

  #renderWaypointList = () => {
    this.#waypointListView = new WaypointListView ();
    render(this.#waypointListView, this.#listContainer);
  };
}
