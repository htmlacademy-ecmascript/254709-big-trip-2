import { render, remove, RenderPosition } from '../framework/render.js';
import AddFormView from '../view/add-form-view/add-form-view.js';
import { UserAction, StatusAction, UpdateType } from '../const.js';

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
  #waypointEmptyComponent = null;
  #onCreateEmptyComponent = null;

  constructor({ listContainer, offersModel, destinationsModel, onDataChange, sortPresenter, filterPresenter, waypointEmptyComponent, onCreateEmptyComponent}) {
    this.#listContainer = listContainer;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#formContainer = this.#listContainer.querySelector('.trip-events__list');
    this.#handleDataChange = onDataChange;
    this.#sortPresenter = sortPresenter;
    this.#filterPresenter = filterPresenter;
    this.#waypointEmptyComponent = waypointEmptyComponent;
    this.#onCreateEmptyComponent = onCreateEmptyComponent;
  }

  init() {
    this.#newWaypointBtn = document.querySelector('.trip-main__event-add-btn');
    this.#newWaypointBtn.addEventListener('click', this.#onNewWaypointClick);
  }

  setStatus(statusAction) {
    switch(statusAction) {
      case 'SAVING':
        this.#addFormComponent.updateElement({isDisabled: true, isSaving: true});
        break;
      case 'SAVED':
        this.#destroyForm();
        break;
      case 'ERROR':
        if (this.#addFormComponent) {
          const resetFormState = () => {
            this.#addFormComponent.updateElement({isDisabled: false, isSaving: false,});
          };
          this.#addFormComponent.shake(resetFormState);
        }
        break;
    }
  }

  updateEmptyComponent(emptyComponent) {
    this.#waypointEmptyComponent = emptyComponent;
  }

  destroyPresenter() {
    this.#destroyForm();
  }

  #onNewWaypointClick = () => {
    this.#newWaypointBtn.setAttribute('disabled', '');
    document.addEventListener('keydown', this.#escKeyDownHandler);
    if (this.#sortPresenter && typeof this.#sortPresenter.resetSortType === 'function') {
      this.#sortPresenter.resetSortType();
      this.#filterPresenter.resetFilter();
    }
    if (this.#waypointEmptyComponent) {
      remove(this.#waypointEmptyComponent);
      this.#waypointEmptyComponent = null;
    }
    this.#addFormComponent = new AddFormView({
      offersModel: this.#offersModel,
      destinationsModel: this.#destinationsModel,
      onFormSubmit: this.#handleFormSubmit,
      onCancelClick: this.#handleCancelClick
    });
    render(this.#addFormComponent, this.#formContainer, RenderPosition.AFTERBEGIN);
  };

  #handleFormSubmit = (formData) => {
    this.setStatus(StatusAction.SAVING);
    this.#handleDataChange(
      UserAction.ADD_WAYPOINT,
      UpdateType.VIEW_CHANGE,
      formData.waypoint
    );
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#destroyForm();
      if (this.#formContainer.children.length === 0 && this.#onCreateEmptyComponent) {
        this.#waypointEmptyComponent = this.#onCreateEmptyComponent();
      }
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

  #handleCancelClick = () => {
    this.#destroyForm();

    if (this.#formContainer.children.length === 0 && this.#onCreateEmptyComponent) {
      this.#waypointEmptyComponent = this.#onCreateEmptyComponent();
    }
  };

  #destroyForm = () => {
    if (this.#addFormComponent) {
      remove(this.#addFormComponent);
      this.#addFormComponent = null;
    }

    this.#newWaypointBtn.removeAttribute('disabled');
  };
}
