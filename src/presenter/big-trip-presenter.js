import { render, RenderPosition } from '../framework/render.js';
import { humanizeTaskHeadDate } from '../utils/waypoints.js';
import { getSortByDefault } from '../utils/sort.js';
import TripInfoView from '../view/trip-info-view/trip-info-view.js';
import WaypointListView from '../view/waypoint-list-view/waypoint-list-view.js';

export default class BigTripPresenter {
  #tripInfoContainer = null;
  #listContainer = null;
  #waypointsModel = null;
  #offersModel = null;
  #destinationsModel = null;
  #tripInfoView = null;
  #waypointListView = null;

  constructor({ tripInfoContainer, listContainer, waypointsModel, offersModel, destinationsModel }) {
    this.#tripInfoContainer = tripInfoContainer;
    this.#listContainer = listContainer;
    this.#waypointsModel = waypointsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
  }

  init() {
    if (!this.#renderWaypointList()) {
      this.#renderWaypointList();
    }

    this.#waypointsModel.addObserver(this.#handleModelEvent);
    if (this.#waypointsModel.originalWaypoints.length > 0 && !this.#tripInfoView) {
      this.#renderTripInfo();
    }
  }

  #getDestinationsDate = (waypoints) => {
    const sortedWaypoints = [...waypoints].sort(getSortByDefault);
    const dateFrom = humanizeTaskHeadDate(sortedWaypoints[0].dateFrom);
    const dateTo = humanizeTaskHeadDate(sortedWaypoints[sortedWaypoints.length - 1].dateTo);
    const tripDuration = `${dateFrom} — ${dateTo}`;
    return tripDuration.toLowerCase();
  };

  #getDestinationsInfo = (waypoints) => {
    const sortedWaypoints = [...waypoints].sort(getSortByDefault);
    const allUniqueDestination = [...new Set(sortedWaypoints.map((item) => this.#destinationsModel.getDestinationById(item.destination).name))];
    let tripRoute = null;
    if (allUniqueDestination.length === 1) {
      tripRoute = allUniqueDestination[0];
      return tripRoute;
    }
    if (allUniqueDestination.length === 2) {
      tripRoute = `${allUniqueDestination[0]} — ${allUniqueDestination[1]}`;
      return tripRoute;
    }
    if (allUniqueDestination.length === 3) {
      tripRoute = `${allUniqueDestination[0]} — ${allUniqueDestination[1]} — ${allUniqueDestination[2]}`;
      return tripRoute;
    }
    if (allUniqueDestination.length > 3) {
      tripRoute = `${allUniqueDestination[0]} — ... — ${allUniqueDestination[allUniqueDestination.length - 1]}`;
      return tripRoute;
    }
  };

  #getFullPrice = (waypoints) => {
    const mainPrice = waypoints.reduce((price, waypoint) => {
      price += waypoint.basePrice;
      return price;
    }, 0);

    let offersPrice = 0;
    const allOffersId = waypoints.filter((waypoint) => waypoint.offersId.length > 0).flatMap((waypoint) => waypoint.offersId);
    allOffersId.forEach((offerId) => {
      const price = this.#offersModel.getOfferPriceById(offerId);
      offersPrice += price;
    }
    );
    return mainPrice + offersPrice;
  };

  #handleModelEvent = () => {
    if (this.#waypointsModel.originalWaypoints.length === 0) {
      if (this.#tripInfoView) {
        this.#tripInfoView.destroy();
        this.#tripInfoView = null;
      }
      return;
    }

    if (this.#tripInfoView) {
      this.#tripInfoView.destroy();
      this.#tripInfoView = null;
    }
    this.#renderTripInfo();
  };

  #renderTripInfo = () => {
    const totalPrice = this.#getFullPrice(this.#waypointsModel.originalWaypoints);
    const tripRoute = this.#getDestinationsInfo(this.#waypointsModel.originalWaypoints);
    const tripDuration = this.#getDestinationsDate(this.#waypointsModel.originalWaypoints);
    this.#tripInfoView = new TripInfoView({ totalPrice, tripRoute, tripDuration });
    render(this.#tripInfoView, this.#tripInfoContainer, RenderPosition.AFTERBEGIN);
  };

  #renderWaypointList = () => {
    this.#waypointListView = new WaypointListView ();
    render(this.#waypointListView, this.#listContainer);
  };
}
