import { getRandomWaypoint, mockOffersArray, mockDestinationsArray } from '../mocks/waypoints';


const WAYPOINT_QTY = 3;

export default class WaypointModel {
  waypoints = Array.from({ length: WAYPOINT_QTY }, getRandomWaypoint);
  offers = mockOffersArray;
  destinations = mockDestinationsArray;

  getWaypoints() {
    return this.waypoints;
  }

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

  getDestinations() {
    return this.destinations;
  }

  getDestinationById(id) {
    return this.getDestinations().find((item) => item.id === id);
  }
}
