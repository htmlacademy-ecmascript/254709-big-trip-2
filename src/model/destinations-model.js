import { mockDestinations } from '../mocks/waypoints.js';

export default class DestinationsModel {
  #allDestinations = mockDestinations;
  #waypointsApiService = null;

  constructor({waypointsApiService}) {
    this.#waypointsApiService = waypointsApiService;
    this.#waypointsApiService.destinations.then((destinations) => console.log(destinations));
  }

  get allDestinations() {
    return this.#allDestinations;
  }

  getDestinationById(id) {
    return this.#allDestinations.find((item) => item.id === id);
  }
}
