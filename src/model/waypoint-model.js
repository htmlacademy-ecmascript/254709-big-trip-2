import { getRandomWaypoint, mockOffersArray, mockDestinationArray } from '../mocks/waypoints';


const WAYPOINT_QTY = 3;

export default class WaypointModel {
  waypoints = Array.from({ length: WAYPOINT_QTY }, getRandomWaypoint);
  offers = mockOffersArray;
  destination = mockDestinationArray;

  getWaypoints() {
    return this.waypoints;
  }

  getOffers() {
    return this.offers;
  }

  getOffersByType(type) {
    return this.getOffers().find((offer) => offer.type === type);
  }

  getOffersById(type, itemsId) {
    const offersType = this.getOffersByType(type);
    return offersType.offers.filter((item) => itemsId.includes(item.id));
  }

  getDestinations() {
    return this.destination;
  }

  getDestinationsById(id) {
    return this.getDestinations().find((item) => item.id === id);
  }
}
