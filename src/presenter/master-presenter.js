import BigTripPresenter from './big-trip-presenter.js';
import WaypointPresenter from './waypoint-presenter.js';
import SortListPresenter from './sort-presenter.js';
import NewWaypointPresenter from './new-waypoint-presenter.js';

import { getSortbyDefault, getSortbyTime, getSortbyPrice } from '../utils/sort.js';
import { UserAction, UpdateType, SortType } from '../const.js';

export default class MasterPresenter {
  #tripMainContainer = null;
  #tripEventsContainer = null;

  #waypointsModel = null;
  #offersModel = null;
  #destinationsModel = null;
  #filtersModel = null;

  #bigTripPresenter = null;
  #sortPresenter = null;
  #waypointPresenters = new Map();

  #currentSortType = SortType.DEFAULT;

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

    this.#waypointsModel.addObserver(this.#handleModelEvent);
  }

  get waypoints() {
    switch(this.#currentSortType) {
      case SortType.DEFAULT:
        return [...this.#waypointsModel.waypoints].sort(getSortbyDefault);
      case SortType.TIME:
        return [...this.#waypointsModel.waypoints].sort(getSortbyTime);
      case SortType.PRICE:
        return [...this.#waypointsModel.waypoints].sort(getSortbyPrice);
    }
    return this.#waypointsModel.waypoints;
  }

  init() {
    this.#runApp();
  }

  #runApp = () => {
    this.#initBigTripPresenter();
    this.#initSortPresenter();
    this.#initWaypoints();
    this.#initNewWaypointsPresenter();
  };

  #initBigTripPresenter = () => {
    const filtersListContainer = this.#tripMainContainer.querySelector('.trip-controls__filters');

    this.#bigTripPresenter = new BigTripPresenter({
      tripInfoContainer: this.#tripMainContainer,
      filtersListContainer: filtersListContainer,
      filtersModel: this.#filtersModel,
      listContainer: this.#tripEventsContainer
    });

    this.#bigTripPresenter.init();
  };

  #initSortPresenter = () => {
    this.#sortPresenter = new SortListPresenter({
      listContainer: this.#tripEventsContainer,
      onSortTypeChange: this.#handleSortChange,
    });
    this.#sortPresenter.init();
  };

  #initNewWaypointsPresenter = () => {
    this.newWaypointsPresenter = new NewWaypointPresenter({
      listContainer: this.#tripEventsContainer,
      offersModel: this.#offersModel,
      destinationsModel: this.#destinationsModel,
      onDataChange: this.#handleViewAction,
      sortPresenter: this.#sortPresenter,
    });
    this.newWaypointsPresenter.init();
  };

  #initWaypoints = () => {
    this.waypoints.forEach((waypoint) => {
      this.#renderWaypoint(waypoint);
    });
  };

  #renderWaypoint = (waypoint) => {
    const waypointPresenter = new WaypointPresenter({
      listContainer: this.#tripEventsContainer,
      offersModel: this.#offersModel,
      destinationsModel: this.#destinationsModel,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange,
    });

    waypointPresenter.init(waypoint);
    this.#waypointPresenters.set(waypoint.id, waypointPresenter);
  };

  // Меняем модель тут, получая данные из waypoint-presenter. После изменения данных срабатывает handleModelEvent
  #handleViewAction = (userAction, updateType, updatedWaypoint) => {
    switch (userAction) {
      case UserAction.UPDATE_WAYPOINT:
        this.#waypointsModel.updateWaypoint(updateType, updatedWaypoint);
        break;
      case UserAction.ADD_WAYPOINT:
        this.#waypointsModel.addWaypoint(updateType, updatedWaypoint);
        break;
      case UserAction.DELETE_WAYPOINT:
        this.#waypointsModel.deleteWaypoint(updateType, updatedWaypoint);
        break;
    }
    console.log(this.#waypointsModel.waypoints);
  };

  // Дергается при изменении модели
  #handleModelEvent = (updateType, updatedWaypoint) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#waypointPresenters.get(updatedWaypoint.id).init(updatedWaypoint);
        break;
      case UpdateType.MINOR:
        this.#reload();
        break;
      case UpdateType.MAJOR:
        this.#sortPresenter.resetSortType();
        this.#reload();
        break;
    }
  };

  #handleSortChange = (dataset) => {
    this.#currentSortType = dataset.sortType;
    this.#reload();
  };

  #reload = () => {
    this.destroy();
    this.#initWaypoints();
  };

  #handleModeChange = () => {
    this.#waypointPresenters.forEach((presenter) => presenter.resetView());
  };

  destroy() {
    this.#waypointPresenters.forEach((presenter) => presenter.clear());
  }
}
