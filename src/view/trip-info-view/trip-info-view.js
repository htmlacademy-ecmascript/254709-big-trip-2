import { createElement } from '../../render.js';
import { tripInfoTemplate } from './trip-info-view-template.js';

const createTripInfoTemplate = () => tripInfoTemplate;

export default class TripInfoView {
  getTemplate() {
    return createTripInfoTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
