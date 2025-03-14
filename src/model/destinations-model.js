export default class DestinationsModel {
  #allDestinations = null;

  init(destination) {
    this.#allDestinations = destination;
  }

  get allDestinations() {
    return this.#allDestinations;
  }

  getDestinationById(id) {
    return this.#allDestinations.find((item) => item.id === id);
  }
}
