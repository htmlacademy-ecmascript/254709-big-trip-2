import Observable from '../framework/observable.js';

export default class WaypointsModel extends Observable {
  #waypoints = [];
  #originalWaypoints = [];
  #waypointsApiService = null;

  constructor({waypointsApiService}) {
    super();
    this.#waypointsApiService = waypointsApiService;
  }

  init(waypoints) {
    this.#waypoints = waypoints.map(this.#adaptToClient);
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

  async updateWaypoint(updateType, update) {
    try {
      this.#waypoints = [...this.#originalWaypoints];
      const response = await this.#waypointsApiService.updateWaypoint(update);
      const updatedWaypoint = this.#adaptToClient(response);
      const index = this.#findWaypointIndex(update.id);

      this.#waypoints = [
        ...this.#waypoints.slice(0, index),
        update,
        ...this.#waypoints.slice(index + 1),
      ];
      this.#updateOriginalWaypoints();

      this._notify(updateType, updatedWaypoint);
    } catch(err) {
      throw new Error('Can\'t update waypoint');
    }
  }

  async addWaypoint(updateType, update) {
    try {
      this.#waypoints = [...this.#originalWaypoints];
      const response = await this.#waypointsApiService.addWaypoint(update);
      const addedWaypoint = this.#adaptToClient(response);
      this.#waypoints = [addedWaypoint, ...this.#waypoints];
      this.#updateOriginalWaypoints();

      this._notify(updateType, addedWaypoint);
    } catch(err) {
      throw new Error('Can\'t add waypoint');
    }

  }

  async deleteWaypoint(updateType, update) {
    try {
      const originalIndex = this.#originalWaypoints.findIndex((waypoint) => waypoint.id === update.id);

      if (originalIndex !== -1) {
        this.#originalWaypoints = [
          ...this.#originalWaypoints.slice(0, originalIndex),
          ...this.#originalWaypoints.slice(originalIndex + 1),
        ];
      }

      this.#waypoints = [...this.#originalWaypoints];
      const response = await this.#waypointsApiService.deleteWaypoint(update);
      const deletedWaypoint = this.#adaptToClient(response);
      this.#updateOriginalWaypoints();
      this._notify(updateType, deletedWaypoint);
    } catch(err) {
      throw new Error('Can\'t delete waypoint');
    }

  }

  setWaypoints(updateType, waypoints) {
    this.#waypoints = [...waypoints];

    this._notify(updateType);
  }

  setFilteredWaypoints(waypoints) {
    this.#waypoints = [...waypoints];
  }

  resetToOriginal(updateType) {
    this.#waypoints = [...this.#originalWaypoints];
    this._notify(updateType);
  }

  #adaptToClient(waypoint) {
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

