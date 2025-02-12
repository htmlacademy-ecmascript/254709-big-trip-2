import { createElement } from '../../render.js';
import { waypointListTemplate } from './waypoint-list-view-template.js';

const createWaypointListTemplate = () => waypointListTemplate;

export default class WaypointListView {
  getTemplate() {
    return createWaypointListTemplate();
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
