import BigTripPresenter from './big-trip-presenter.js';
import WaypointPresenter from './waypoint-presenter.js';
// import WaypointEmptyView from '../view/waypoint-empty-view/waypoint-empty-view.js';
import { updateItem } from '../utils/common.js';

export default class MasterPresenter {
  #tripMainContainer = null;
  #tripEventsContainer = null;

  #waypointsModel = null;
  #offersModel = null;
  #destinationsModel = null;
  #filtersModel = null;

  #bigTripPresenter = null;
  #waypointPresenters = new Map();
  // #waypointEmptyElement = new WaypointEmptyView();
  #waypoints = [];

  constructor({
    tripMainContainer,
    tripEventsContainer,
    waypointsModel,
    offersModel,
    destinationsModel,
    filtersModel
  }) {
    this.#tripMainContainer = tripMainContainer;
    this.#tripEventsContainer = tripEventsContainer;

    this.#waypointsModel = waypointsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#filtersModel = filtersModel;
  }

  init() {
    this.#waypoints = [...this.#waypointsModel.waypoints];
    this.#runApp();
  }

  #runApp() {
    this.#initBigTripPresenter();
    this.#initWaypoints();
  }

  #initBigTripPresenter() {
    const filtersListContainer = this.#tripMainContainer.querySelector('.trip-controls__filters');

    this.#bigTripPresenter = new BigTripPresenter({
      tripInfoContainer: this.#tripMainContainer,
      filtersListContainer: filtersListContainer,
      filtersModel: this.#filtersModel,
      listContainer: this.#tripEventsContainer
    });

    this.#bigTripPresenter.init();
  }

  #initWaypoints() {
    this.#waypoints.forEach((waypoint) => {
      this.#renderWaypoint(waypoint);
    });
  }

  #renderWaypoint(waypoint) {
    const waypointPresenter = new WaypointPresenter({
      listContainer: this.#tripEventsContainer,
      offersModel: this.#offersModel,
      destinationsModel: this.#destinationsModel,
      onDataChange: this.#handleWaypointChange,
      onModeChange: this.#handleModeChange,
    });

    waypointPresenter.init(waypoint);
    this.#waypointPresenters.set(waypoint.id, waypointPresenter);
  }

  // #renderWaypointEmpty() {
  //   render(this.#waypointEmptyElement, this.#tripEventsContainer);
  // }
  #handleWaypointChange = (updatedWaypoint) => {
    this.#waypoints = updateItem(this.#waypoints, updatedWaypoint);
    this.#waypointPresenters.get(updatedWaypoint.id).init(updatedWaypoint);
  };

  #handleModeChange = () => {
    this.#waypointPresenters.forEach((presenter) => presenter.resetView());
  };

  destroy() {
    this.#waypointPresenters.forEach((presenter) => presenter.destroy());
    this.#waypointPresenters.clear();
  }
}
