import { render, RenderPosition } from '../framework/render.js';
import TripInfoView from '../view/trip-info-view/trip-info-view.js';
import WaypointListView from '../view/waypoint-list-view/waypoint-list-view.js';

export default class BigTripPresenter {
  #tripInfoContainer = null;
  #tripInfoView = new TripInfoView();
  #listContainer = null;
  #waypointListView = null;

  constructor({ tripInfoContainer, listContainer }) {
    this.#tripInfoContainer = tripInfoContainer;
    this.#listContainer = listContainer;
  }

  init() {
    this.#renderTripInfo();
    this.#renderWaypointList();
  }

  #renderTripInfo = () => {
    render(this.#tripInfoView, this.#tripInfoContainer, RenderPosition.AFTERBEGIN);
  };

  #renderWaypointList = () => {
    this.#waypointListView = new WaypointListView ();
    render(this.#waypointListView, this.#listContainer);
  };
}
