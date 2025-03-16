import { render, RenderPosition } from '../framework/render.js';
import TripInfoView from '../view/trip-info-view/trip-info-view.js';
import WaypointListView from '../view/waypoint-list-view/waypoint-list-view.js';

export default class BigTripPresenter {
  #tripInfoContainer = null;
  #tripInfoView = null;
  #listContainer = null;
  #waypointListView = null;
  #waypointsModel = null;
  #offersModel = null;

  constructor({ tripInfoContainer, listContainer, waypointsModel, offersModel }) {
    this.#tripInfoContainer = tripInfoContainer;
    this.#listContainer = listContainer;
    this.#waypointsModel = waypointsModel;
    this.#offersModel = offersModel;
  }

  init() {
    this.#renderWaypointList();
    this.#waypointsModel.addObserver(this.#handleModelEvent);
    this.#renderTripInfo();
  }

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
    this.#tripInfoView.destroy();
    this.#tripInfoView = null;
    this.#renderTripInfo();
  };

  #renderTripInfo = () => {
    const totalPrice = this.#getFullPrice(this.#waypointsModel.originalWaypoints);
    this.#tripInfoView = new TripInfoView({ price: totalPrice });
    render(this.#tripInfoView, this.#tripInfoContainer, RenderPosition.AFTERBEGIN);
  };

  #renderWaypointList = () => {
    this.#waypointListView = new WaypointListView ();
    render(this.#waypointListView, this.#listContainer);
  };
}
