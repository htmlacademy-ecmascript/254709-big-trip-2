import AbstractStatefulView from '../../framework/view/abstract-stateful-view.js';
import { POINT_TYPES } from '../../const.js';
import { humanizeEditFormDate, DATE_FORMAT_EDIT_FORM } from '../../utils/waypoints.js';
import { editFormTemplate } from './edit-form-view-template.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const createOffersMap = (offers) => {
  const map = new Map();
  offers.forEach((type) => {
    type.offers.forEach((offer) => {
      map.set(offer.id, offer);
    });
  });
  return map;
};

const createEditFormTemplate = (waypoint, offers, destination, offerType, destinationsAll) => {
  const idWaypoints = offers.map((item) => item.id);
  const { type, dateFrom, dateTo, basePrice, id } = waypoint;
  const { name: namePoint, description, pictures } = destination;
  return editFormTemplate({
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
    humanizeEditFormDate,
    DATE_FORMAT_EDIT_FORM
  });
};
export default class EditFormView extends AbstractStatefulView {
  #onFormSubmit = null;
  #onEditClick = null;
  #onDeleteClick = null;
  #initialState = null;
  #datepickerFrom = null;
  #datepickerTo = null;


  constructor({ waypoint, offers, destination, offerType, offersAll, destinationsAll, onFormSubmit, onEditClick, onDeleteClick }) {
    super();
    this.#initialState = EditFormView.parseDataToState(waypoint, offers, offerType, offersAll, destination, destinationsAll);
    this._setState(this.#initialState);

    this.#onFormSubmit = onFormSubmit;
    this.#onEditClick = onEditClick;
    this.#onDeleteClick = onDeleteClick;

    this._restoreHandlers();
  }

  _restoreHandlers() {
    this.element.querySelector('.event--edit').addEventListener('submit', this.#submitClickHandler);
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#deleteClickHandler);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
    this.element.querySelector('.event__type-group').addEventListener('click', this.#typeChangeHandler);

    if (this.element.querySelector('.event__available-offers')) {
      this.element.querySelector('.event__available-offers').addEventListener('click', this.#offersChangeHandler);
    }

    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationChangeHandler);
    this.element.querySelector('.event__input--price').addEventListener('input', this.#priceChangeHandler);

    this.#setDatepickers();
  }

  get template() {
    const {waypoint, offers, destination, offerType, destinationsAll} = this._state;
    return createEditFormTemplate(waypoint, offers, destination, offerType, destinationsAll);
  }

  #deleteClickHandler = () => {
    this.#onDeleteClick(EditFormView.parseStateToData(this._state));
  };

  #submitClickHandler = (evt) => {
    evt.preventDefault();
    this.#onFormSubmit(EditFormView.parseStateToData(this._state));
  };

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.#onEditClick();
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

  #destinationChangeHandler = (evt) => {
    evt.preventDefault();

    const input = evt.target;
    const newDestination = this._state.destinationsAll.find((item) => item.name === input.value);

    this.updateElement({
      destination: newDestination,
    });
  };

  #onDateFromChangeHandler = ([userDate]) => {
    this._setState({
      waypoint: {
        ...this._state.waypoint,
        dateFrom: userDate,
      }
    });
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

  reset() {
    this.updateElement(this.#initialState);
  }

  static parseDataToState = (waypoint, offers, offerType, offersAll, destination, destinationsAll) => ({
    waypoint: {...waypoint},
    offers,
    offerType,
    offersAll,
    destination,
    destinationsAll
  });

  static parseStateToData = (state) => ({
    waypoint: {
      ...state.waypoint,
      offersId: state.offers.map((offer) => offer.id),
      destination: state.destination.id
    },
    offers: state.offers,
    destination: state.destination,
    offerType: state.offerType,
    destinationsAll: state.destinationsAll
  });
}
