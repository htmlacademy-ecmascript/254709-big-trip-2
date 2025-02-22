import AbstractStatefulView from '../../framework/view/abstract-stateful-view.js';
import { POINT_TYPES } from '../../const.js';
import { humanizeEditFormDate, DATE_FORMAT_EDIT_FORM } from '../../utils/waypoints.js';
import { editFormTemplate } from './edit-form-view-template.js';

const createClassName = (title) => title.toLowerCase().replace(/ /g, '-');

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


  constructor({ waypoint, offers, destination, offerType, offersAll, destinationsAll, onFormSubmit, onEditClick }) {
    super();
    this._state = {
      waypoint: structuredClone(waypoint),
      offers: structuredClone(offers),
      offerType: structuredClone(offerType),
      offersAll: structuredClone(offersAll),
      destination: structuredClone(destination),
      destinationsAll: structuredClone(destinationsAll),
    };

    this.#onFormSubmit = onFormSubmit;
    this.#onEditClick = onEditClick;

    this._restoreHandlers();
  }

  _restoreHandlers() {
    this.element.querySelector('.event--edit').addEventListener('submit', this.#submitClickHandler);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
    this.element.querySelector('.event__type-group').addEventListener('click', this.#typeChangeHandler);
  }

  get template() {
    const {waypoint, offers, destination, offerType, destinationsAll} = this._state;
    return createEditFormTemplate(waypoint, offers, destination, offerType, destinationsAll);
  }

  #submitClickHandler = (evt) => {
    evt.preventDefault();
    this.#onFormSubmit(this._state);
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
    console.log(this._state.offerType);
    console.log(newType);
    console.log(offersAll);
    console.log(newOfferType);
    this.updateElement({
      waypoint: {
        ...this._state.waypoint,
        type: newType,
      },
      offerType: newOfferType,
    });
  };
}
