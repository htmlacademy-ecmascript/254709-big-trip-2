import Observable from '../framework/observable.js';
import { getRandomWaypoint } from '../mocks/waypoints.js';


const WAYPOINT_QTY = 3;

export default class WaypointsModel extends Observable {
  #waypoints = Array.from({ length: WAYPOINT_QTY }, getRandomWaypoint);
  #waypointsApiService = null;
  #originalWaypoints = null;

  constructor({waypointsApiService}) {
    super();
    this.#waypointsApiService = waypointsApiService;
    this.#updateOriginalWaypoints();

    this.#waypointsApiService.waypoints.then((waypoints) => console.log(waypoints));
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
}
