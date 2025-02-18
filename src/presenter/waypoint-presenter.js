import { render, replace, remove } from '../framework/render.js';
import WaypointItemView from '../view/waypoint-item-view/waypoint-item-view.js';
import EditFormView from '../view/edit-form-view/edit-form-view.js';


export default class WaypointPresenter {
  #listContainer = null;
  #offersModel = null;
  #destinationsModel = null;
  #waypoint = null;
  #waypointComponent = null;
  #editFormComponent = null;
  #waypointListElement = null;

  constructor({ listContainer, offersModel, destinationsModel }) {
    this.#listContainer = listContainer;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#waypointListElement = this.#listContainer.querySelector('.trip-events__list');
  }

  init(waypoint) {
    this.#waypoint = waypoint;
    const destinationsAll = this.#destinationsModel.allDestinations;
    this.#renderWaypoint(this.#waypoint, destinationsAll);
  }

  #renderWaypoint(waypoint, destinationsAll) {
    const offers = this.#offersModel.getOffersById(waypoint.type, waypoint.offersId);
    const destination = this.#destinationsModel.getDestinationById(waypoint.destination);
    const offerType = this.#offersModel.getOfferByType(waypoint.type);

    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        this.#toggleStateWaypoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    this.#waypointComponent = new WaypointItemView({
      waypoint,
      offers,
      destination,
      onEditClick: () => {
        this.#toggleStateWaypoint('Show edit Form');
        document.addEventListener('keydown', escKeyDownHandler);
      },
    });

    this.#editFormComponent = new EditFormView({
      waypoint,
      offers,
      destination,
      offerType,
      destinationsAll,
      onFormSubmit: () => {
        this.#toggleStateWaypoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      },
      onEditClick: () => {
        this.#toggleStateWaypoint();
        document.addEventListener('keydown', escKeyDownHandler);
      },
    });

    render(this.#waypointComponent, this.#waypointListElement);
  }

  #toggleStateWaypoint = (isView) => {
    if (isView) {
      replace(this.#editFormComponent, this.#waypointComponent);
    } else {
      replace(this.#waypointComponent, this.#editFormComponent);
    }
  };

  destroy() {
    if (this.#waypointComponent) {
      remove(this.#waypointComponent);
    }
  }
}
