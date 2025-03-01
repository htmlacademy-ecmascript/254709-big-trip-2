import Observable from '../framework/observable.js';
import { getRandomWaypoint } from '../mocks/waypoints.js';


const WAYPOINT_QTY = 3;

export default class WaypointsModel extends Observable {
  #waypoints = Array.from({ length: WAYPOINT_QTY }, getRandomWaypoint);

  get waypoints() {
    return this.#waypoints;
  }

  #findWaypointIndex(waypointId) {
    const index = this.#waypoints.findIndex((waypoint) => waypoint.id === waypointId);
    if (index === -1) {
      throw new Error('Waypoint not found');
    }
    return index;
  }

  updateWaypoint(updateType, update) {
    const index = this.#findWaypointIndex(update.id);

    this.#waypoints = [
      ...this.#waypoints.slice(0, index),
      update,
      ...this.#waypoints.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  addWaypoint(updateType, update) {
    this.#waypoints = [update, ...this.#waypoints];
    this._notify(updateType, update);
  }

  deleteWaypoint(updateType, update) {
    const index = this.#findWaypointIndex(update.id);

    this.#waypoints = [
      ...this.#waypoints.slice(0, index),
      ...this.#waypoints.slice(index + 1),
    ];

    this._notify(updateType);
  }
}
