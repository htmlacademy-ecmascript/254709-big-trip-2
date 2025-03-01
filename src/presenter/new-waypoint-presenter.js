import { render, remove, RenderPosition } from '../framework/render.js';
import AddFormView from '../view/add-form-view/add-form-view.js';
import { UserAction, UpdateType } from '../const.js';

export default class NewWaypointPresenter {
  #listContainer = null;
  #offersModel = null;
  #destinationsModel = null;
  #addFormComponent = null;
  #formContainer = null;
  #handleDataChange = null;
  #newWaypointBtn = null;
  #sortPresenter = null;

  constructor({ listContainer, offersModel, destinationsModel, onDataChange, sortPresenter }) {
    this.#listContainer = listContainer;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#formContainer = this.#listContainer.querySelector('.trip-events__list');
    this.#handleDataChange = onDataChange;
    this.#sortPresenter = sortPresenter;
  }

  init() {
    this.#newWaypointBtn = document.querySelector('.trip-main__event-add-btn');
    this.#newWaypointBtn.addEventListener('click', this.#onNewWaypointClick);
  }

  #onNewWaypointClick = () => {
    this.#newWaypointBtn.setAttribute('disabled', '');
    this.#sortPresenter.resetSortType();
    this.#addFormComponent = new AddFormView({
      offersModel: this.#offersModel,
      destinationsModel: this.#destinationsModel,
      onFormSubmit: this.#handleFormSubmit,
      onDeleteClick: this.#handleCancelClick
    });

    render(this.#addFormComponent, this.#formContainer, RenderPosition.AFTERBEGIN);
    this.#handleDataChange();
  };

  #handleFormSubmit = (formData) => {
    this.#handleDataChange(
      UserAction.ADD_WAYPOINT,
      UpdateType.MINOR,
      formData.waypoint
    );
    this.#destroyForm();
  };

  #handleCancelClick = () => {
    this.#destroyForm();
  };

  #destroyForm = () => {
    if (this.#addFormComponent) {
      remove(this.#addFormComponent);
      this.#addFormComponent = null;
    }

    this.#newWaypointBtn.removeAttribute('disabled');
  };

  destroy() {
    this.#destroyForm();

    if (this.#newWaypointBtn) {
      this.#newWaypointBtn.removeEventListener('click', this.#onNewWaypointClick);
    }
  }
}
