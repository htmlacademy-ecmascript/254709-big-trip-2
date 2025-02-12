import { mockDestinationsArray } from '../mocks/waypoints';

export default class DestinationsModel {
  destinations = mockDestinationsArray;

  getDestinations() {
    return this.destinations;
  }

  getDestinationById(id) {
    return this.getDestinations().find((item) => item.id === id);
  }
}
