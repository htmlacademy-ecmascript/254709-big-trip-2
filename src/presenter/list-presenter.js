import { render, replace } from '../../src/framework/render.js';
import SortListView from '../view/sort-list-view/sort-list-view.js';
import WaypointItemView from '../view/waypoint-item-view/waypoint-item-view.js';
import WaypointEmptyView from '../view/waypoint-empty-view/waypoint-empty-view.js';
import EditFormView from '../view/edit-form-view/edit-form-view.js';


export default class ListPresenter {
  #listContainer = null;
  #waypointsModel = null;
  #offersModel = null;
  #destinationsModel = null;
  #waypoints = null;
  #waypointListElement = new WaypointItemView({isListView: true});
  #waypointEmptyElement = new WaypointEmptyView();
  #sortListComponent = new SortListView();

  constructor({ listContainer, waypointsModel, offersModel, destinationsModel }) {
    this.#listContainer = listContainer;
    this.#waypointsModel = waypointsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
  }

  init() {
    this.#waypoints = [...this.#waypointsModel.waypoints];
    this.#renderWaypointList();
  }

  #renderWaypointList() {
    if (this.#waypoints.length === 0) {
      this.#renderWaypointEmpty();
    } else {
      this.#renderAllWaypoints();
    }
  }

  #renderWaypointEmpty() {
    render(this.#waypointEmptyElement, this.#listContainer);
  }

  #renderAllWaypoints() {
    render(this.#sortListComponent, this.#listContainer);
    render(this.#waypointListElement, this.#listContainer);
    const destinationsAll = this.#destinationsModel.allDestinations;
    this.#waypoints.forEach((waypoint) => {
      this.#renderWaypoint(waypoint, destinationsAll);
    });
  }

  #renderWaypoint(waypoint, destinationsAll) {
    const offers = this.#offersModel.getOffersById(waypoint.type, waypoint.offersId);
    const destination = this.#destinationsModel.getDestinationById(waypoint.destination);
    const offerType = this.#offersModel.getOfferByType(waypoint.type);

    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        toggleStateWaypoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const waypointComponent = new WaypointItemView({
      waypoint,
      offers,
      destination,
      onEditClick: () => {
        toggleStateWaypoint('Show edit Form');
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
        toggleStateWaypoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      },
      onEditClick: () => {
        toggleStateWaypoint();
        document.addEventListener('keydown', escKeyDownHandler);
      },
    });

    function toggleStateWaypoint (isView) {
      if (isView) {
        replace(editFormComponent, waypointComponent);
      } else {
        replace(waypointComponent, editFormComponent);
      }
    }
    render(waypointComponent, this.#waypointListElement.element);
  }
}
