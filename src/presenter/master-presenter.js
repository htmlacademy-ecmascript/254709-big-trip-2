import BigTripPresenter from './big-trip-presenter.js';
import WaypointPresenter from './waypoint-presenter.js';
import SortListPresenter from './sort-list-presenter.js';
import NewWaypointPresenter from './new-waypoint-presenter.js';
import WaypointEmptyView from '../view/waypoint-empty-view/waypoint-empty-view.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';
import { getSortByDefault, getSortByTime, getSortByPrice } from '../utils/sort.js';
import { UserAction, UpdateType, SortType, EventMsg, FilterAction, StatusAction, TimeLimit } from '../const.js';
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


  #currentSortType = SortType.DAY.NAME;

  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER,
    upperLimit: TimeLimit.UPPER,
  });

  constructor({
    tripMainContainer,
    tripEventsContainer,
    waypointsModel,
    offersModel,
    destinationsModel,
    filterPresenter,
  }) {
    this.#tripMainContainer = tripMainContainer;
    this.#tripEventsContainer = tripEventsContainer;

    this.#waypointsModel = waypointsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#filterPresenter = filterPresenter;
    this.#waypointsModel.addObserver(this.#handleModelEvent);
  }

  get waypoints() {
    switch(this.#currentSortType) {
      case SortType.DAY.NAME:
        return [...this.#waypointsModel.waypoints].sort(getSortByDefault);
      case SortType.TIME.NAME:
        return [...this.#waypointsModel.waypoints].sort(getSortByTime);
      case SortType.PRICE.NAME:
        return [...this.#waypointsModel.waypoints].sort(getSortByPrice);
    }
    return this.#waypointsModel.waypoints;
  }

  init() {
    this.#runApp();
  }

  createEmptyComponent = () => {
    const currentFilter = this.#filterPresenter.getCurrentFilter();

    if (this.#waypointEmptyComponent) {
      this.#waypointEmptyComponent.destroy();
    }

    this.#waypointEmptyComponent = new WaypointEmptyView(EventMsg[`${currentFilter.toUpperCase()}`]);
    render(this.#waypointEmptyComponent, this.#tripEventsContainer);

    return this.#waypointEmptyComponent;
  };

  destroyPresenters() {
    this.#waypointPresenters.forEach((presenter) => presenter.clear());
  }

  #runApp = () => {
    this.#initBigTripPresenter();
    this.#filterPresenter.addCallback(this.#handleFilterChange);
    this.#filterPresenter.addModel(this.#waypointsModel);
    this.#updateWaypointsUI();
    this.#initNewWaypointsPresenter();
  };

  #initBigTripPresenter = () => {
    this.#bigTripPresenter = new BigTripPresenter({
      tripInfoContainer: this.#tripMainContainer,
      listContainer: this.#tripEventsContainer,
      waypointsModel: this.#waypointsModel,
      offersModel: this.#offersModel,
      destinationsModel: this.#destinationsModel,
      waypointEmptyComponent: this.#waypointEmptyComponent
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
    this.#newWaypointsPresenter = new NewWaypointPresenter({
      listContainer: this.#tripEventsContainer,
      offersModel: this.#offersModel,
      destinationsModel: this.#destinationsModel,
      onDataChange: this.#handleViewAction,
      sortPresenter: this.#sortPresenter,
      filterPresenter: this.#filterPresenter,
      waypointEmptyComponent: this.#waypointEmptyComponent,
      onCreateEmptyComponent: this.createEmptyComponent
    });
    this.#newWaypointsPresenter.init();
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
    this.#checkWaypointsLength(currentFilter);
    this.waypoints.forEach((waypoint) => {
      this.#renderWaypoint(waypoint);
    });
  };

  #checkWaypointsLength = (currentFilter) => {
    if (this.waypoints.length === 0) {
      if (this.#sortPresenter) {
        this.#sortPresenter.destroy();
        this.#sortPresenter = null;
      }
      this.#waypointEmptyComponent = new WaypointEmptyView(EventMsg[`${currentFilter.toUpperCase()}`]);
      render(this.#waypointEmptyComponent, this.#tripEventsContainer);

      if (this.#newWaypointsPresenter) {
        this.#newWaypointsPresenter.updateEmptyComponent(this.#waypointEmptyComponent);
      }
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

  #handleFilterChange = (filterAction, filterType) => {
    if (this.#sortPresenter && typeof this.#sortPresenter.resetSortType === 'function') {
      this.#sortPresenter.resetSortType();
    }
    switch (filterAction) {
      case FilterAction.SET_FILTER:
        if (filterType === 'everything') {
          this.#waypointsModel.resetToOriginal(UpdateType.VIEW_CHANGE);
        } else {
          const filteredWaypoints = this.#filterPresenter.getFilteredWaypoints(filterType.toUpperCase());
          this.#waypointsModel.setWaypoints(UpdateType.VIEW_CHANGE, filteredWaypoints);
        }
        break;
      case FilterAction.RESET_FILTER:
        this.#waypointsModel.resetToOriginal(UpdateType.VIEW_CHANGE);
        break;
    }
  };

  #handleViewAction = async (userAction, updateType, updatedWaypoint) => {
    this.#uiBlocker.block();
    try {
      switch (userAction) {
        case UserAction.UPDATE_WAYPOINT:
          this.#waypointPresenters.get(updatedWaypoint.id).setStatus(StatusAction.SAVING);
          await this.#waypointsModel.updateWaypoint(updateType, updatedWaypoint);
          this.#waypointPresenters.get(updatedWaypoint.id).setStatus(StatusAction.SAVED);
          break;
        case UserAction.ADD_WAYPOINT:
          this.#newWaypointsPresenter.setStatus(StatusAction.SAVING);
          await this.#waypointsModel.addWaypoint(updateType, updatedWaypoint);
          this.#newWaypointsPresenter.setStatus(StatusAction.SAVED);
          this.#reload();
          break;
        case UserAction.DELETE_WAYPOINT:
          this.#waypointPresenters.get(updatedWaypoint.id).setStatus(StatusAction.DELETING);
          await this.#waypointsModel.deleteWaypoint(updateType, updatedWaypoint);
          this.#waypointPresenters.get(updatedWaypoint.id).setStatus(StatusAction.SAVED);
          break;
      }
    } catch (error) {
      if (userAction === UserAction.ADD_WAYPOINT) {
        this.#newWaypointsPresenter.setStatus(StatusAction.ERROR);
      } else if (userAction === UserAction.UPDATE_WAYPOINT || userAction === UserAction.DELETE_WAYPOINT) {
        const presenter = this.#waypointPresenters.get(updatedWaypoint.id);
        if (presenter) {
          presenter.setStatus(StatusAction.ERROR);
        }
      }
    }
    this.#uiBlocker.unblock();
  };

  #handleModelEvent = (updateType, updatedWaypoint) => {
    switch (updateType) {
      case UpdateType.PATCH: {
        this.#waypointPresenters.get(updatedWaypoint.id).init(updatedWaypoint);
        break;
      }
      case UpdateType.VIEW_CHANGE: {
        const currentFilter = this.#filterPresenter.getCurrentFilter();
        if (currentFilter !== 'everything') {
          const filteredWaypoints = this.#filterPresenter.getFilteredWaypoints(currentFilter.toUpperCase());
          this.#waypointsModel.setFilteredWaypoints(filteredWaypoints);
        }
        this.#reload();
        break;
      }
    }
  };

  #handleSortChange = (dataset) => {
    this.#currentSortType = dataset.sortType;
    this.#reload();
  };

  #handleModeChange = () => {
    this.#waypointPresenters.forEach((presenter) => presenter.resetView());
  };

  #reload = () => {
    this.destroyPresenters();
    this.#bigTripPresenter.init();
    if (this.#waypointsModel.originalWaypoints.length === 1 && this.#waypointEmptyComponent) {
      this.#filterPresenter.addCallback(this.#handleFilterChange);
      this.#filterPresenter.addModel(this.#waypointsModel);
      this.#updateWaypointsUI();
    } else {
      this.#updateWaypointsUI();
    }
  };
}
