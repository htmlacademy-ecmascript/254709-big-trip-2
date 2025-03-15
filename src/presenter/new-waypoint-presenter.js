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
  #filterPresenter = null;


  constructor({ listContainer, offersModel, destinationsModel, onDataChange, sortPresenter, filterPresenter }) {
    this.#listContainer = listContainer;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#formContainer = this.#listContainer.querySelector('.trip-events__list');
    this.#handleDataChange = onDataChange;
    this.#sortPresenter = sortPresenter;
    this.#filterPresenter = filterPresenter;
  }

  init() {
    this.#newWaypointBtn = document.querySelector('.trip-main__event-add-btn');
    this.#newWaypointBtn.addEventListener('click', this.#onNewWaypointClick);
  }

  #onNewWaypointClick = () => {
    this.#newWaypointBtn.setAttribute('disabled', '');
    document.addEventListener('keydown', this.#escKeyDownHandler);
    if (this.#sortPresenter) {
      this.#sortPresenter.resetSortType();
    }
    this.#filterPresenter.resetFilter();

    this.#addFormComponent = new AddFormView({
      offersModel: this.#offersModel,
      destinationsModel: this.#destinationsModel,
      onFormSubmit: this.#handleFormSubmit,
      onDeleteClick: this.#handleCancelClick
    });

    render(this.#addFormComponent, this.#formContainer, RenderPosition.AFTERBEGIN);
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#destroyForm();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };


  #handleFormSubmit = (formData) => {

    this.#handleDataChange(
      UserAction.ADD_WAYPOINT,
      UpdateType.VIEW_CHANGE,
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

  destroyPresenter() {
    this.#destroyForm();
  }
}
