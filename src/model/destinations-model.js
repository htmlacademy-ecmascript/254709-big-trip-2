import { mockDestinationsArray } from '../mocks/waypoints.js';

export default class DestinationsModel {
  #allDestinations = mockDestinationsArray;

  get allDestinations() {
    return this.#allDestinations;
  }

  getDestinationById(id) {
    return this.#allDestinations.find((item) => item.id === id);
  }
}
