import { render } from '../render.js';
import SortListView from '../view/sort-list-view/sort-list-view.js';
import WaypointListView from '../view/waypoint-list-view/waypoint-list-view.js';
import WaypointContentView from '../view/waypoint-item-view/waypoint-item-view.js';
import EditFormView from '../view/edit-form-view/edit-form-view.js';
// import { getRandomInt } from '../util.js';
// import AddFormView from '../view/add-form-view.js';

export default class ListPresenter {
  waypointListElement = new WaypointListView();

  constructor({ listContainer, waypointModel }) {
    this.listContainer = listContainer;
    this.waypointModel = waypointModel;
  }

  init() {
    this.waypoints = [...this.waypointModel.getWaypoints()];

    render(new SortListView(), this.listContainer);
    render(this.waypointListElement, this.listContainer);

    const editFormView = new EditFormView({
      waypoint: this.waypoints[0],
      offersType: this.waypointModel.getOffersByType(this.waypoints[0].type),
      offers: [...this.waypointModel.getOffersById(this.waypoints[0].type, this.waypoints[0].offersId)],
      destination: this.waypointModel.getDestinationsById(this.waypoints[0].destination),
      destinationsAll: this.waypointModel.getDestinations(),
    });
    render(editFormView, this.waypointListElement.getElement());

    // render(this.addFormElement, this.waypointListElement.getElement());
    // render(new AddFormView(), this.addFormElement.getElement());

    this.waypoints.forEach((waypoint) => {
      this.renderWaypoint(waypoint);
    });
  }

  renderWaypoint(waypoint) {
    const offers = this.waypointModel.getOffersById(waypoint.type, waypoint.offersId);
    const destination = this.waypointModel.getDestinationsById(waypoint.destination);

    const waypointComponent = new WaypointContentView(waypoint, offers, destination);

    render(waypointComponent, this.waypointListElement.getElement());
  }
}
