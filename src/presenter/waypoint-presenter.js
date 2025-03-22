import { render, replace, remove } from '../framework/render.js';
import WaypointItemView from '../view/waypoint-item-view/waypoint-item-view.js';
import EditFormView from '../view/edit-form-view/edit-form-view.js';
import { Mode, UserAction, UpdateType } from '../const.js';

export default class WaypointPresenter {
  #listContainer = null;
  #offersModel = null;
  #destinationsModel = null;
  #handleDataChange = null;
  #handleModeChange = null;
  #newWaypointsPresenter = null;
  #waypointListElement = null;
  #waypoint = null;
  #waypointComponent = null;
  #editFormComponent = null;
  #mode = Mode.VIEW;

  constructor({ listContainer, offersModel, destinationsModel, onDataChange, onModeChange, newWaypointPresenter }) {
    this.#listContainer = listContainer;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
    this.#newWaypointsPresenter = newWaypointPresenter;

    this.#waypointListElement = this.#listContainer.querySelector('.trip-events__list');
  }

  init(waypoint) {
    this.#waypoint = waypoint;
    const destinationsAll = this.#destinationsModel.allDestinations;
    this.#renderWaypoint(this.#waypoint, destinationsAll);
  }

  setStatus(statusAction) {
    switch(statusAction) {
      case 'SAVING':
        if (this.#editFormComponent) {
          this.#editFormComponent.updateElement({isDisabled: true, isSaving: true});
        }
        break;
      case 'DELETING':
        if (this.#editFormComponent) {
          this.#editFormComponent.updateElement({isDisabled: true, isDeleting: true});
        }
        break;
      case 'SAVED':
        if (this.#mode === Mode.EDITING) {
          this.#toggleStateWaypoint(false);
        } else {
          this.init(this.#waypoint);
        }
        break;
      case 'ERROR':
        if (this.#mode === Mode.VIEW) {
          this.#waypointComponent.shake();
          return;
        }
        this.#editFormComponent.shake(this.#resetFormState);
        break;
    }
  }

  resetView() {
    if (this.#mode !== Mode.VIEW) {
      this.#editFormComponent.reset();
      this.#toggleStateWaypoint(false);
    }
  }

  clear() {
    if (this.#waypointComponent) {
      remove(this.#waypointComponent);
    }
    if (this.#editFormComponent) {
      remove(this.#editFormComponent);
    }
  }

  #renderWaypoint = (waypoint, destinationsAll) => {
    const offers = this.#offersModel.getOffersById(waypoint.type, waypoint.offersId);
    const offersAll = this.#offersModel.allOffers;
    const destination = this.#destinationsModel.getDestinationById(waypoint.destination);
    const offerType = this.#offersModel.getOfferByType(waypoint.type);

    const prevWaypointComponent = this.#waypointComponent;
    const prevEditFormComponent = this.#editFormComponent;

    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        this.#editFormComponent.reset();
        this.#toggleStateWaypoint(false);
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    this.#waypointComponent = new WaypointItemView({
      waypoint,
      offers,
      destination,
      onEditClick: () => {
        this.#toggleStateWaypoint(true);
        if (this.#newWaypointsPresenter) {
          this.#newWaypointsPresenter.destroyPresenter();
        }
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
      offersAll,
      offerType,
      destinationsAll,
      onFormSubmit: (updatedWaypoint) => {
        this.#onFormSubmitChange(updatedWaypoint);
      },
      onEditClick: () => {
        this.#toggleStateWaypoint(false);
        document.addEventListener('keydown', escKeyDownHandler);
      },
      onDeleteClick: (deletedWaypoint) => {
        this.#deleteWaypoint(deletedWaypoint);
      }
    });

    if (prevWaypointComponent === null || prevEditFormComponent === null) {
      render(this.#waypointComponent, this.#waypointListElement);
      return;
    }

    if (this.#mode === Mode.VIEW) {
      replace(this.#waypointComponent, prevWaypointComponent);
    }
    if (this.#mode === Mode.EDITING) {
      replace(this.#editFormComponent, prevEditFormComponent);
    }
    remove(prevWaypointComponent);
    remove(prevEditFormComponent);
  };

  #toggleStateWaypoint = (isView) => {
    if (isView) {
      replace(this.#editFormComponent, this.#waypointComponent);
      this.#handleModeChange();
      this.#mode = Mode.EDITING;
    } else {
      replace(this.#waypointComponent, this.#editFormComponent);
      this.#mode = Mode.VIEW;
    }
  };

  #onFormSubmitChange = (updatedWaypoint) => {
    this.#waypoint = updatedWaypoint.waypoint;
    this.#handleDataChange(UserAction.UPDATE_WAYPOINT, UpdateType.VIEW_CHANGE, {...this.#waypoint});
  };

  #resetFormState = () => {
    this.#editFormComponent.updateElement({
      isDisabled: false,
      isSaving: false,
      isDeleting: false,
    });
  };

  #deleteWaypoint = (deletedWaypoint) => {
    this.#waypoint = deletedWaypoint.waypoint;
    this.#handleDataChange(UserAction.DELETE_WAYPOINT, UpdateType.VIEW_CHANGE, {...this.#waypoint});
  };

  #toggleStateFavorite = () => {
    this.#waypoint = {...this.#waypoint, isFavorite: !this.#waypoint.isFavorite};
    this.#handleDataChange(UserAction.UPDATE_WAYPOINT, UpdateType.PATCH, {...this.#waypoint});
  };

}
