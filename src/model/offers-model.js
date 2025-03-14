import { mockOffers } from '../mocks/waypoints.js';

export default class OffersModel {
  #allOffers = mockOffers;
  #waypointsApiService = null;

  constructor({waypointsApiService}) {
    this.#waypointsApiService = waypointsApiService;
    this.#waypointsApiService.offers.then((offers) => console.log(offers));
  }

  get allOffers() {
    return this.#allOffers;
  }

  getOfferByType(type) {
    return this.#allOffers.find((offer) => offer.type === type);
  }

  getOffersById(type, itemsId) {
    const offersType = this.getOfferByType(type);
    return offersType.offers.filter((item) => itemsId.includes(item.id));
  }
}
