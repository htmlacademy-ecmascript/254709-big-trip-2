import { getRandomWaypoint, mockDestinationsArray } from '../mocks/waypoints';


const WAYPOINT_QTY = 3;

export default class WaypointsModel {
  #waypoints = Array.from({ length: WAYPOINT_QTY }, getRandomWaypoint);
  destinations = mockDestinationsArray;

  get waypoints() {
    return this.#waypoints;
  }
}
