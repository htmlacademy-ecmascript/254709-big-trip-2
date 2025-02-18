import HeaderPresenter from './header-presenter.js';
import WaypointPresenter from './waypoint-presenter.js';

export default class BigTripPresenter {
  #tripMainContainer = null;
  #tripEventsContainer = null;

  #waypointsModel = null;
  #offersModel = null;
  #destinationsModel = null;
  #filtersModel = null;

  #headerPresenter = null;
  #waypointPresenters = new Map();
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
    this.#initHeaderPresenter();
    this.#initWaypoints();
  }

  #initHeaderPresenter() {
    const filtersListContainer = this.#tripMainContainer.querySelector('.trip-controls__filters');

    this.#headerPresenter = new HeaderPresenter({
      tripInfoContainer: this.#tripMainContainer,
      filtersListContainer: filtersListContainer,
      filtersModel: this.#filtersModel,
      listContainer: this.#tripEventsContainer
    });

    this.#headerPresenter.init();
  }

  #initWaypoints() {
    this.#waypoints.forEach((waypoint) => {
      this.#renderWaypoint(waypoint);
    });
  }

  #renderWaypoint(waypoint) {
    const waypointPresenter = new WaypointPresenter({
      listContainer: this.#tripEventsContainer,
      waypointsModel: this.#waypointsModel,
      offersModel: this.#offersModel,
      destinationsModel: this.#destinationsModel
    });

    waypointPresenter.init(waypoint);
    this.#waypointPresenters.set(waypoint.id, waypointPresenter);
  }

  destroy() {
    this.#waypointPresenters.forEach((presenter) => presenter.destroy());
    this.#waypointPresenters.clear();
  }
}
