import Observable from '../framework/observable.js';
import { getRandomWaypoint } from '../mocks/waypoints.js';


const WAYPOINT_QTY = 3;

export default class WaypointsModel extends Observable {
  #waypoints = Array.from({ length: WAYPOINT_QTY }, getRandomWaypoint);
  #originalWaypoints = null;

  constructor() {
    super();
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
    this.#waypoints = [...this.#originalWaypoints];
    const index = this.#findWaypointIndex(update.id);

    this.#waypoints = [
      ...this.#waypoints.slice(0, index),
      ...this.#waypoints.slice(index + 1),
    ];
    this.#updateOriginalWaypoints();

    this._notify(updateType);
  }

  setWaypoints(updateType, waypoints) {
    this.#waypoints = [...waypoints];
    this._notify(updateType);
  }

  resetToOriginal(updateType) {
    this.#waypoints = [...this.#originalWaypoints];
    this._notify(updateType);
  }
}
