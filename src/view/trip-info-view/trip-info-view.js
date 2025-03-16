import AbstractView from '../../framework/view/abstract-view.js';
import { tripInfoTemplate } from './trip-info-view-template.js';
import { remove } from '../../framework/render.js';

const createTripInfoTemplate = (price, destinationsString) => tripInfoTemplate(price, destinationsString);

export default class TripInfoView extends AbstractView {
  #price = null;
  #destinationsString = null;

  constructor({ price, destinationsString }) {
    super();
    this.#price = price;
    this.#destinationsString = destinationsString;
  }

  get template() {
    return createTripInfoTemplate(this.#price, this.#destinationsString);
  }

  destroy() {
    remove(this);
  }
}
