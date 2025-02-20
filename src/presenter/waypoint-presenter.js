import { render, replace, remove } from '../framework/render.js';
import WaypointItemView from '../view/waypoint-item-view/waypoint-item-view.js';
import EditFormView from '../view/edit-form-view/edit-form-view.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};
export default class WaypointPresenter {
  #listContainer = null;
  #offersModel = null;
  #destinationsModel = null;
  #waypoint = null;
  #waypointComponent = null;
  #editFormComponent = null;
  #waypointListElement = null;
  #handleFavoriteChange = null;
  #handleModeChange = null;
  #mode = Mode.DEFAULT;

  constructor({ listContainer, offersModel, destinationsModel, onDataChange, onModeChange }) {
    this.#listContainer = listContainer;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#waypointListElement = this.#listContainer.querySelector('.trip-events__list');
    this.#handleFavoriteChange = onDataChange;
    this.#handleModeChange = onModeChange;
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

    const prevWaypointComponent = this.#waypointComponent;
    const prevEditFormComponent = this.#editFormComponent;

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
        this.#toggleStateWaypoint(true);
        document.addEventListener('keydown', escKeyDownHandler);
      },
      onFavoriteClick: () => {
        this.#toggleStateFavorite();
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

    if (prevWaypointComponent === null || prevEditFormComponent === null) {
      render(this.#waypointComponent, this.#waypointListElement);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#waypointComponent, prevWaypointComponent);
    }
    if (this.#mode === Mode.EDITING) {
      replace(this.#editFormComponent, prevEditFormComponent);
    }
    remove(prevWaypointComponent);
    remove(prevEditFormComponent);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#toggleStateWaypoint(false);
    }
  }

  #toggleStateWaypoint = (isView) => {
    if (isView) {
      replace(this.#editFormComponent, this.#waypointComponent);
      this.#handleModeChange();
      this.#mode = Mode.EDITING;
    } else {
      replace(this.#waypointComponent, this.#editFormComponent);
      this.#mode = Mode.DEFAULT;
    }
  };

  #toggleStateFavorite = () => {
    this.#handleFavoriteChange({...this.#waypoint, isFavorite: !this.#waypoint.isFavorite});
  };

  clear() {
    if (this.#waypointComponent) {
      remove(this.#waypointComponent);
    }
    if (this.#editFormComponent) {
      remove(this.#editFormComponent);
    }
  }
}
