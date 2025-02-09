import { render } from '../render.js';
import SortListView from '../view/sort-list-view.js';
import WaypointListView from '../view/waypoint-list-view.js';
import WaypointItemView from '../view/waypoint-item-view.js';
import WaypointContentView from '../view/waypoint-content-view.js';
import EditFormView from '../view/edit-form-view.js';
// import { getRandomInt } from '../util.js';
// import AddFormView from '../view/add-form-view.js';

export default class ListPresenter {
  waypointListElement = new WaypointListView();
  waypointItemElement = new WaypointItemView();
  editFormElement = new WaypointItemView();
  addFormElement = new WaypointItemView();

  constructor({ listContainer, waypointModel }) {
    this.listContainer = listContainer;
    this.waypointModel = waypointModel;
  }

  init() {
    this.waypoints = [...this.waypointModel.getWaypoints()];

    render(new SortListView(), this.listContainer);
    render(this.waypointListElement, this.listContainer);

    render(this.editFormElement, this.waypointListElement.getElement());

    const editFormView = new EditFormView({
      waypoint: this.waypoints[0],
      offersType: this.waypointModel.getOffersByType(this.waypoints[0].type),
      offers: [...this.waypointModel.getOffersById(this.waypoints[0].type, this.waypoints[0].offersId)],
      destination: this.waypointModel.getDestinationsById(this.waypoints[0].destination),
      destinationAll: this.waypointModel.getDestinations(),
    });

    render(editFormView, this.editFormElement.getElement());

    // render(this.addFormElement, this.waypointListElement.getElement());
    // render(new AddFormView(), this.addFormElement.getElement());

    this.waypoints.forEach((waypoint) => {
      this.renderWaypoint(waypoint);
    });
  }

  renderWaypoint(waypoint) {
    const waypointContainer = new WaypointItemView();

    const offers = this.waypointModel.getOffersById(waypoint.type, waypoint.offersId);
    const destination = this.waypointModel.getDestinationsById(waypoint.destination);

    const waypointComponent = new WaypointContentView(waypoint, offers, destination);

    render(waypointContainer, this.waypointListElement.getElement());
    render(waypointComponent, waypointContainer.getElement());
  }
}
