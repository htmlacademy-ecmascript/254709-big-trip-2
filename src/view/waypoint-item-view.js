import { createElement } from '../render.js';

function createWaypointItemTemplate() {

  return `<li class="trip-events__item">
            </li>`;
}

export default class WaypointItemView {
  getTemplate() {
    return createWaypointItemTemplate();
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
