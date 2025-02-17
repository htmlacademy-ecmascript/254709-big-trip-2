import { render, replace } from '../../src/framework/render.js';
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

  constructor({ listContainer, waypointsModel, offersModel, destinationsModel }) {
    this.#listContainer = listContainer;
    this.#waypointsModel = waypointsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
  }

  init() {
    this.#waypoints = [...this.#waypointsModel.waypoints];
    this.#renderAllWaypoints();
  }

  #renderAllWaypoints() {
    render(this.#sortListComponent, this.#listContainer);
    render(this.#waypointListElement, this.#listContainer);
    this.#waypoints.forEach((waypoint) => {
      this.#renderWaypoint(waypoint);
    });
  }

  #renderWaypoint(waypoint) {
    const offers = this.#offersModel.getOffersById(waypoint.type, waypoint.offersId);
    const destination = this.#destinationsModel.getDestinationById(waypoint.destination);
    const offerType = this.#offersModel.getOfferByType(waypoint.type);
    const destinationsAll = this.#destinationsModel.allDestinations;

    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToWaypoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const waypointComponent = new WaypointItemView({
      waypoint,
      offers,
      destination,
      onEditClick: () => {
        replaceWaypointToForm();
        document.addEventListener('keydown', escKeyDownHandler);
      },
    });

    const editFormComponent = new EditFormView({
      waypoint,
      offers,
      destination,
      offerType,
      destinationsAll,
      onFormSubmit: () => {
        replaceFormToWaypoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      },
      onEditClick: () => {
        replaceFormToWaypoint();
        document.addEventListener('keydown', escKeyDownHandler);
      },
    });

    function replaceWaypointToForm() {
      replace(editFormComponent, waypointComponent);
    }

    function replaceFormToWaypoint() {
      replace(waypointComponent, editFormComponent);
    }

    render(waypointComponent, this.#waypointListElement.element);
  }
}
