export default class OffersModel {
  #allOffers = null;

  init(offers) {
    this.#allOffers = offers;
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

  getOffersIdAndPrice() {
    return this.#allOffers.flatMap((offerType) => offerType.offers.map((offer) => ({id: offer.id, price: offer.price})));
  }

  getOfferPriceById(targetId) {
    for (const offerType of this.#allOffers) {
      const foundOffer = offerType.offers.find((offer) => offer.id === targetId);
      if (foundOffer) {
        return foundOffer.price;
      }
    }
    return null;
  }

}
