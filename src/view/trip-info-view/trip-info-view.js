import AbstractView from '../../framework/view/abstract-view.js';
import { tripInfoTemplate } from './trip-info-view-template.js';
import { remove } from '../../framework/render.js';

const createTripInfoTemplate = (price, destinationsString, destinationsDateString) => tripInfoTemplate(price, destinationsString, destinationsDateString);

export default class TripInfoView extends AbstractView {
  #price = null;
  #destinationsString = null;
  #destinationsDateString = null;

  constructor({ price, destinationsString, destinationsDateString }) {
    super();
    this.#price = price;
    this.#destinationsString = destinationsString;
    this.#destinationsDateString = destinationsDateString;
  }

  get template() {
    return createTripInfoTemplate(this.#price, this.#destinationsString, this.#destinationsDateString);
  }

  destroy() {
    remove(this);
  }
}
