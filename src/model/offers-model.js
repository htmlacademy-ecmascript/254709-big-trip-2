import { mockOffers } from '../mocks/waypoints.js';

export default class OffersModel {
  #allOffers = mockOffers;

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
