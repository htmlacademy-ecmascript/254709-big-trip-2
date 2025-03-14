import Observable from '../framework/observable.js';

export default class WaypointsModel extends Observable {
  #waypoints = null;
  #originalWaypoints = null;

  constructor() {
    super();
  }

  init(waypoints) {
    this.#waypoints = waypoints.map(this.#adaptToApp);
    this.#updateOriginalWaypoints();
  }

  #updateOriginalWaypoints = () => {
    this.#originalWaypoints = [...this.#waypoints];
  };

  get waypoints() {
    return this.#waypoints;
  }

  get originalWaypoints() {
    return this.#originalWaypoints;
  }

  #findWaypointIndex(waypointId) {
    const index = this.#waypoints.findIndex((waypoint) => waypoint.id === waypointId);
    if (index === -1) {
      throw new Error('Waypoint not found');
    }
    return index;
  }

  updateWaypoint(updateType, update) {
    this.#waypoints = [...this.#originalWaypoints];
    const index = this.#findWaypointIndex(update.id);

    this.#waypoints = [
      ...this.#waypoints.slice(0, index),
      update,
      ...this.#waypoints.slice(index + 1),
    ];
    this.#updateOriginalWaypoints();

    this._notify(updateType, update);
  }

  addWaypoint(updateType, update) {
    this.#waypoints = [...this.#originalWaypoints];
    this.#waypoints = [update, ...this.#waypoints];
    this.#updateOriginalWaypoints();

    this._notify(updateType, update);
  }

  deleteWaypoint(updateType, update) {
    const originalIndex = this.#originalWaypoints.findIndex((waypoint) => waypoint.id === update.id);

    if (originalIndex !== -1) {
      this.#originalWaypoints = [
        ...this.#originalWaypoints.slice(0, originalIndex),
        ...this.#originalWaypoints.slice(originalIndex + 1),
      ];
    }

    this.#waypoints = [...this.#originalWaypoints];

    this._notify(updateType, update);
  }

  setWaypoints(updateType, waypoints) {
    if (!waypoints) {
      this.#waypoints = [];
    } else {
      this.#waypoints = [...waypoints];
    }
    this._notify(updateType);
  }

  setFilteredWaypoints(waypoints) {
    if (!waypoints) {
      this.#waypoints = [];
    } else {
      this.#waypoints = [...waypoints];
    }
  }

  resetToOriginal(updateType) {
    this.#waypoints = [...this.#originalWaypoints];
    this._notify(updateType);
  }

  #adaptToApp(waypoint) {
    const adaptedWaypoint = {
      ...waypoint,
      basePrice: waypoint['base_price'],
      dateFrom: waypoint['date_from'],
      dateTo: waypoint['date_to'],
      isFavorite: waypoint['is_favorite'],
      offersId: waypoint.offers,
    };

    delete adaptedWaypoint['base_price'];
    delete adaptedWaypoint['date_from'];
    delete adaptedWaypoint['date_to'];
    delete adaptedWaypoint['is_favorite'];
    delete adaptedWaypoint['offers'];

    return adaptedWaypoint;
  }
}

