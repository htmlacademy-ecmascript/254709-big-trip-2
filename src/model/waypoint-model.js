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
    const allOffers = this.getOffers();
    return allOffers.find((offer) => offer.type === type);
  }

  getOffersById(type, itemsId) {
    const offersType = this.getOffersByType(type);
    return offersType.offers.filter((item) => itemsId.find((id) => item.id === id));
  }

  getDestinations() {
    return this.destination;
  }

  getDestinationsById(id) {
    const allDestination = this.getDestinations();
    return allDestination.find((item) => item.id === id);
  }
}
