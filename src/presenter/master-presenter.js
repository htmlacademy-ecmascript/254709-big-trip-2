import BigTripPresenter from './big-trip-presenter.js';
import WaypointPresenter from './waypoint-presenter.js';
import SortListPresenter from './sort-presenter.js';
import NewWaypointPresenter from './new-waypoint-presenter.js';
import WaypointEmptyView from '../view/waypoint-empty-view/waypoint-empty-view.js';

import { getSortbyDefault, getSortbyTime, getSortbyPrice } from '../utils/sort.js';
import { UserAction, UpdateType, SortType, EventsMsg } from '../const.js';
import FilterPresenter from './filter-presenter.js';
import { render } from '../framework/render.js';

export default class MasterPresenter {
  #tripMainContainer = null;
  #tripEventsContainer = null;
  #waypointEmptyComponent = null;

  #waypointsModel = null;
  #offersModel = null;
  #destinationsModel = null;

  #bigTripPresenter = null;
  #filterPresenter = null;
  #sortPresenter = null;
  #newWaypointsPresenter = null;
  #waypointPresenters = new Map();


  #currentSortType = SortType.DEFAULT;

  constructor({
    tripMainContainer,
    tripEventsContainer,
    waypointsModel,
    offersModel,
    destinationsModel,
  }) {
    this.#tripMainContainer = tripMainContainer;
    this.#tripEventsContainer = tripEventsContainer;

    this.#waypointsModel = waypointsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;

    this.#waypointsModel.addObserver(this.#handleModelEvent);
  }

  get waypoints() {
    switch(this.#currentSortType) {
      case SortType.DAY.NAME:
        return [...this.#waypointsModel.waypoints].sort(getSortbyDefault);
      case SortType.TIME.NAME:
        return [...this.#waypointsModel.waypoints].sort(getSortbyTime);
      case SortType.PRICE.NAME:
        return [...this.#waypointsModel.waypoints].sort(getSortbyPrice);
    }
    return this.#waypointsModel.waypoints;
  }

  init() {
    this.#runApp();
  }

  #runApp = () => {
    this.#initBigTripPresenter();
    this.#initFilterPresenter();
    this.#initWaypoints();
    this.#initNewWaypointsPresenter();
  };

  #initBigTripPresenter = () => {
    this.#bigTripPresenter = new BigTripPresenter({
      tripInfoContainer: this.#tripMainContainer,
      listContainer: this.#tripEventsContainer
    });

    this.#bigTripPresenter.init();
  };

  #initFilterPresenter = () => {
    const filtersListContainer = this.#tripMainContainer.querySelector('.trip-controls__filters');
    this.#filterPresenter = new FilterPresenter({
      filtersListContainer: filtersListContainer,
      waypointsModel: this.#waypointsModel,
    });
    this.#filterPresenter.init();
  };

  #initSortPresenter = () => {
    this.#sortPresenter = new SortListPresenter({
      listContainer: this.#tripEventsContainer,
      onSortTypeChange: this.#handleSortChange,
    });
    this.#sortPresenter.init();
  };

  #initNewWaypointsPresenter = () => {
    this.#newWaypointsPresenter = new NewWaypointPresenter({
      listContainer: this.#tripEventsContainer,
      offersModel: this.#offersModel,
      destinationsModel: this.#destinationsModel,
      onDataChange: this.#handleViewAction,
      sortPresenter: this.#sortPresenter,
      filterPresenter: this.#filterPresenter,
    });
    this.#newWaypointsPresenter.init();
  };

  #initWaypoints = () => {
    this.#updateWaypointsUI();
    this.waypoints.forEach((waypoint) => {
      this.#renderWaypoint(waypoint);
    });
  };

  #updateWaypointsUI = () => {
    if (this.#waypointEmptyComponent) {
      this.#waypointEmptyComponent.destroy();
      this.#waypointEmptyComponent = null;
    }
    if (!this.#sortPresenter) {
      this.#initSortPresenter();
    }

    const currentFilter = this.#filterPresenter.getCurrentFilter();
    console.log(currentFilter);
    console.log(EventsMsg[`${currentFilter.toUpperCase()}`]);
    console.log(this.waypoints.length);
    if (this.waypoints.length === 0) {
      this.#sortPresenter.destroy();
      this.#sortPresenter = null;
      this.#waypointEmptyComponent = new WaypointEmptyView(EventsMsg[`${currentFilter.toUpperCase()}`]);
      render(this.#waypointEmptyComponent, this.#tripEventsContainer);
    }
  };

  #renderWaypoint = (waypoint) => {
    const waypointPresenter = new WaypointPresenter({
      listContainer: this.#tripEventsContainer,
      offersModel: this.#offersModel,
      destinationsModel: this.#destinationsModel,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange,
      newWaypointPresenter: this.#newWaypointsPresenter
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
        this.#filterPresenter.resetFilter();
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
    this.destroyPresenters();
    this.#initWaypoints();
  };

  #handleModeChange = () => {
    this.#waypointPresenters.forEach((presenter) => presenter.resetView());
  };

  destroyPresenters() {
    this.#waypointPresenters.forEach((presenter) => presenter.clear());
  }
}
