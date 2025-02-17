import { render } from '../../src/framework/render.js';
import SortListView from '../view/sort-list-view/sort-list-view.js';
import WaypointListView from '../view/waypoint-list-view/waypoint-list-view.js';
import WaypointItemView from '../view/waypoint-item-view/waypoint-item-view.js';
import EditFormView from '../view/edit-form-view/edit-form-view.js';
// import { getRandomInt } from '../util.js';
// import AddFormView from '../view/add-form-view.js';

export default class ListPresenter {
  #listContainer = null;
  #waypointsModel = null;
  #offersModel = null;
  #destinationsModel = null;
  #waypoints = null;
  #waypointListElement = new WaypointListView();
  #sortListComponent = new SortListView();
  #editFormView = null;

  constructor({ listContainer, waypointsModel, offersModel, destinationsModel }) {
    this.#listContainer = listContainer;
    this.#waypointsModel = waypointsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
  }

  init() {
    this.#waypoints = [...this.#waypointsModel.waypoints];

    render(this.#sortListComponent, this.#listContainer);
    render(this.#waypointListElement, this.#listContainer);

    this.#editFormView = new EditFormView({
      waypoint: this.#waypoints[0],
      offerType: this.#offersModel.getOfferByType(this.#waypoints[0].type),
      offers: [...this.#offersModel.getOffersById(this.#waypoints[0].type, this.#waypoints[0].offersId)],
      destination: this.#destinationsModel.getDestinationById(this.#waypoints[0].destination),
      destinationsAll: this.#destinationsModel.allDestinations,
    });
    render(this.#editFormView, this.#waypointListElement.element);

    // render(this.addFormElement, this.waypointListElement.getElement());
    // render(new AddFormView(), this.addFormElement.getElement());

    this.#waypoints.forEach((waypoint) => {
      this.renderWaypoint(waypoint);
    });
  }

  renderWaypoint(waypoint) {
    const offers = this.#offersModel.getOffersById(waypoint.type, waypoint.offersId);
    const destination = this.#destinationsModel.getDestinationById(waypoint.destination);

    const waypointComponent = new WaypointItemView(waypoint, offers, destination);

    render(waypointComponent, this.#waypointListElement.element);
  }
}
