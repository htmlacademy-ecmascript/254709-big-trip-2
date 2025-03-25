import AbstractView from '../../framework/view/abstract-view.js';
import { tripInfoTemplate } from './trip-info-view-template.js';
import { remove } from '../../framework/render.js';

const createTripInfoTemplate = (totalPrice, tripRoute, tripDuration) => tripInfoTemplate(totalPrice, tripRoute, tripDuration);

export default class TripInfoView extends AbstractView {
  #totalPrice = null;
  #tripRoute = null;
  #tripDuration = null;

  constructor({ totalPrice, tripRoute, tripDuration }) {
    super();
    this.#totalPrice = totalPrice;
    this.#tripRoute = tripRoute;
    this.#tripDuration = tripDuration;
  }

  get template() {
    return createTripInfoTemplate(this.#totalPrice, this.#tripRoute, this.#tripDuration);
  }

  destroy() {
    remove(this);
  }
}
