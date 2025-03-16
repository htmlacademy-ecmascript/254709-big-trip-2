import AbstractView from '../../framework/view/abstract-view.js';
import { tripInfoTemplate } from './trip-info-view-template.js';
import { remove } from '../../framework/render.js';

const createTripInfoTemplate = (price) => tripInfoTemplate(price);

export default class TripInfoView extends AbstractView {
  #price = null;

  constructor({ price }) {
    super();
    this.#price = price;
  }

  get template() {
    return createTripInfoTemplate(this.#price);
  }

  destroy() {
    remove(this);
  }

}
