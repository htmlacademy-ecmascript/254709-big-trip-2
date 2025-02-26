import AbstractStatefulView from '../../framework/view/abstract-stateful-view.js';
import { POINT_TYPES } from '../../const.js';
import { humanizeEditFormDate, DATE_FORMAT_EDIT_FORM } from '../../utils/waypoints.js';
import { editFormTemplate } from './edit-form-view-template.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const createClassName = (title) => title.toLowerCase().replace(/ /g, '-');

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
    createClassName,
    humanizeEditFormDate,
    DATE_FORMAT_EDIT_FORM
  });
};
export default class EditFormView extends AbstractStatefulView {
  #onFormSubmit = null;
  #onEditClick = null;
  #initialState = null;
  #datepickerStart = null;
  #datepickerEnd = null;


  constructor({ waypoint, offers, destination, offerType, offersAll, destinationsAll, onFormSubmit, onEditClick }) {
    super();
    this.#initialState = EditFormView.parseDataToState(waypoint, offers, offerType, offersAll, destination, destinationsAll);
    this._setState(this.#initialState);

    this.#onFormSubmit = onFormSubmit;
    this.#onEditClick = onEditClick;

    this._restoreHandlers();
  }

  _restoreHandlers() {
    this.element.querySelector('.event--edit').addEventListener('submit', this.#submitClickHandler);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
    this.element.querySelector('.event__type-group').addEventListener('click', this.#typeChangeHandler);

    if (this.element.querySelector('.event__available-offers')) {
      this.element.querySelector('.event__available-offers').addEventListener('click', this.#offersChangeHandler);
    }

    this.element.querySelector('.event__input').addEventListener('change', this.#destinationChangeHandler);

    this.#setDatepickers();
  }

  get template() {
    const {waypoint, offers, destination, offerType, destinationsAll} = this._state;
    return createEditFormTemplate(waypoint, offers, destination, offerType, destinationsAll);
  }

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
    this.#datepickerStart = flatpickr(
      this.element.querySelector('input[name="event-start-time"]'),
      {
        enableTime: true,
        // eslint-disable-next-line camelcase
        time_24hr: true,
        dateFormat: 'd/m/y H:i',
        defaultDate: this._state.waypoint.dateFrom,
        onChange: this.#onDateFromChangeHandler,
        onRender: this.#onDateFromChangeHandler,
      }
    );

    this.#datepickerEnd = flatpickr(
      this.element.querySelector('input[name="event-end-time"]'),
      {
        enableTime: true,
        time_24hr: true,
        dateFormat: 'd/m/y H:i',
        defaultDate: this._state.waypoint.dateTo,
        minDate: this._state.waypoint.dateFrom,
        onChange: this.#onDateToChangeHandler,
      }
    );
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
    if ([userDate] > this._state.waypoint.dateTo) {
      this.#onDateToChangeHandler([userDate]);
    }

    this.updateElement({
      waypoint: {
        ...this._state.waypoint,
        dateFrom: userDate,
      }
    });
    if (userDate > this._state.waypoint.dateTo) {
      this.#onDateToChangeHandler([userDate]);
    }
  };

  #onDateToChangeHandler = ([userDate]) => {
    this.updateElement({
      waypoint: {
        ...this._state.waypoint,
        dateTo: userDate,
      }
    });
  };

  removeElement() {
    super.removeElement();
    if (this.#datepickerStart) {
      this.#datepickerStart.destroy();
      this.#datepickerStart = null;
    }
    if (this.#datepickerEnd) {
      this.#datepickerEnd.destroy();
      this.#datepickerEnd = null;
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
