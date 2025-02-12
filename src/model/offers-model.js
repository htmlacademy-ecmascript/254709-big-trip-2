import { mockOffersArray } from '../mocks/waypoints';

export default class OffersModel {
  offers = mockOffersArray;

  getOffers() {
    return this.offers;
  }

  getOfferByType(type) {
    return this.getOffers().find((offer) => offer.type === type);
  }

  getOffersById(type, itemsId) {
    const offersType = this.getOfferByType(type);
    return offersType.offers.filter((item) => itemsId.includes(item.id));
  }
}
