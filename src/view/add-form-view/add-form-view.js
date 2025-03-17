import AbstractStatefulView from '../../framework/view/abstract-stateful-view.js';
import { POINT_TYPES } from '../../const.js';
import { humanizeEditFormDate } from '../../utils/waypoints.js';
import { addFormTemplate } from './add-form-view-template.js';
import flatpickr from 'flatpickr';

const BLANK_WAYPOINT = {
  type: 'flight',
  dateFrom: null,
  dateTo: null,
  basePrice: 0,
  offersId: [],
  destination: null,
  isFavorite: false,
};

const BLANK_DESTINATION = {
  id: null,
  name: '',
  description: '',
  pictures: []
};

const createClassName = (title) => title.toLowerCase().replace(/ /g, '-').replace(/[#.[\]]/g, '');

const createOffersMap = (offers) => {
  const map = new Map();
  offers.forEach((type) => {
    type.offers.forEach((offer) => {
      map.set(offer.id, offer);
    });
  });
  return map;
};

const createAddFormTemplate = (waypoint, offers, destination, offerType, destinationsAll, isDisabled, isSaving) => {
  const idWaypoints = offers.map((item) => item.id);
  const { type, dateFrom, dateTo, basePrice, id } = waypoint;
  const { name: namePoint, description, pictures } = destination;

  return addFormTemplate({
    id,
    type,
    dateFrom,
    dateTo,
    basePrice,
    namePoint,
    description,
    pictures,
    POINT_TYPES,
    idWaypoints,
    offerType,
    destinationsAll,
    createClassName,
    humanizeEditFormDate,
    isDisabled,
    isSaving,
  });
};

export default class AddFormView extends AbstractStatefulView {
  #onFormSubmit = null;
  #onDeleteClick = null;
  #datepickerFrom = null;
  #datepickerTo = null;
  #offersModel = null;
  #destinationsModel = null;

  constructor({ offersModel, destinationsModel, onFormSubmit, onDeleteClick }) {
    super();
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#onFormSubmit = onFormSubmit;
    this.#onDeleteClick = onDeleteClick;

    const offersAll = this.#offersModel.allOffers;
    const destinationsAll = this.#destinationsModel.allDestinations;

    const offerType = offersAll.find((offer) => offer.type === BLANK_WAYPOINT.type);

    this._setState(AddFormView.parseDataToState(
      BLANK_WAYPOINT,
      [],
      offerType,
      offersAll,
      BLANK_DESTINATION,
      destinationsAll
    ));

    this._restoreHandlers();
  }

  _restoreHandlers() {
    this.element.querySelector('.event--edit').addEventListener('submit', this.#submitClickHandler);
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#deleteClickHandler);
    this.element.querySelector('.event__type-group').addEventListener('click', this.#typeChangeHandler);

    if (this.element.querySelector('.event__available-offers')) {
      this.element.querySelector('.event__available-offers').addEventListener('click', this.#offersChangeHandler);
    }

    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationChangeHandler);
    this.element.querySelector('.event__input--price').addEventListener('input', this.#priceChangeHandler);

    this.#setDatepickers();
  }

  get template() {
    const { waypoint, offers, destination, offerType, destinationsAll, isDisabled, isSaving } = this._state;
    return createAddFormTemplate(waypoint, offers, destination, offerType, destinationsAll, isDisabled, isSaving);
  }

  #deleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#onDeleteClick();

  };

  #submitClickHandler = (evt) => {
    evt.preventDefault();
    if (!this.#validateWaypointData()) {
      return;
    }
    this.#onFormSubmit(AddFormView.parseStateToData(this._state));
  };

  #validateWaypointData = () => {
    const destinationValid = this._state.destination.id !== null;
    const priceValid = this._state.waypoint.basePrice > 0;
    return destinationValid && priceValid;
  };

  #typeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'LABEL') {
      return;
    }

    evt.preventDefault();
    const inputId = evt.target.getAttribute('for');
    const currentInput = this.element.querySelector(`#${inputId}`);
    const newType = currentInput.value;
    const offersAll = this._state.offersAll;
    const newOfferType = offersAll.find((type) => type.type === newType);

    this.updateElement({
      waypoint: {
        ...this._state.waypoint,
        type: newType,
      },
      offerType: newOfferType,
      offers: []
    });
  };

  #offersChangeHandler = (evt) => {
    const targetLabel = evt.target.closest('.event__offer-label');
    if (!targetLabel) {
      return;
    }

    evt.preventDefault();

    const offersMap = createOffersMap(this._state.offersAll);
    const inputId = targetLabel.getAttribute('for');
    const currentInput = this.element.querySelector(`#${inputId}`);
    const offerId = currentInput.dataset.offerId;
    const offerSelected = offersMap.get(offerId);
    let newOffers = [];

    if (!currentInput.checked) {
      currentInput.setAttribute('checked', '');
      newOffers = [...this._state.offers, offerSelected];
    } else {
      currentInput.removeAttribute('checked', '');
      newOffers = this._state.offers.filter((offer) => offer.id !== offerId);
    }

    this.updateElement({
      offers: newOffers,
    });
  };

  #destinationChangeHandler = (evt) => {
    evt.preventDefault();

    const input = evt.target;
    const newDestination = this._state.destinationsAll.find((item) => item.name === input.value);

    if (!newDestination) {
      return;
    }

    this.updateElement({
      destination: newDestination,
    });
  };

  #priceChangeHandler = (evt) => {
    evt.preventDefault();
    const price = parseInt(evt.target.value, 10);

    if (isNaN(price) || price < 0) {
      return;
    }

    this._setState({
      waypoint: {
        ...this._state.waypoint,
        basePrice: price
      }
    });
  };

  #setDatepickers = () => {
    const [dateFromElement, dateToElement] = this.element.querySelectorAll('.event__input--time');
    const commonConfig = {
      enableTime: true,
      'time_24hr': true,
      dateFormat: 'd/m/y H:i',
      locale: {firstDayOfWeek: 1},
    };

    this.#datepickerFrom = flatpickr(
      dateFromElement,
      {
        ...commonConfig,
        defaultDate: this._state.waypoint.dateFrom,
        maxDate: this._state.waypoint.dateTo,
        onClose: this.#onDateFromChangeHandler,
      }
    );

    this.#datepickerTo = flatpickr(
      dateToElement,
      {
        ...commonConfig,
        defaultDate: this._state.waypoint.dateTo,
        minDate: this._state.waypoint.dateFrom,
        onClose: this.#onDateToChangeHandler,
      }
    );
  };

  #onDateFromChangeHandler = ([userDate]) => {
    this._setState({
      waypoint: {
        ...this._state.waypoint,
        dateFrom: userDate,
      }
    });

    this.#datepickerTo.set('minDate', userDate);
  };

  #onDateToChangeHandler = ([userDate]) => {
    this._setState({
      waypoint: {
        ...this._state.waypoint,
        dateTo: userDate,
      }
    });
  };

  removeElement() {
    super.removeElement();
    if (this.#datepickerFrom) {
      this.#datepickerFrom.destroy();
      this.#datepickerFrom = null;
    }
    if (this.#datepickerTo) {
      this.#datepickerTo.destroy();
      this.#datepickerTo = null;
    }
  }

  static parseDataToState = (waypoint, offers, offerType, offersAll, destination, destinationsAll) => ({
    waypoint: {...waypoint},
    offers,
    offerType,
    offersAll,
    destination,
    destinationsAll,
    isDisabled: false,
    isSaving: false,
  });

  static parseStateToData = (state) => {
    delete state.isDisabled;
    delete state.isSaving;
    return {
      waypoint: {
        ...state.waypoint,
        offersId: state.offers.map((offer) => offer.id),
        destination: state.destination.id
      },
      offers: state.offers,
      destination: state.destination,
      offerType: state.offerType,
      destinationsAll: state.destinationsAll
    };
  };
}
