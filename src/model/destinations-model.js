import { mockDestinations } from '../mocks/waypoints.js';

export default class DestinationsModel {
  #allDestinations = mockDestinations;

  get allDestinations() {
    return this.#allDestinations;
  }

  getDestinationById(id) {
    return this.#allDestinations.find((item) => item.id === id);
  }
}
