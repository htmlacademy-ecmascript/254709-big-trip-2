import { createElement } from '../../render.js';
import { humanizeTaskDueDate, humanizeTaskDueTime, getDuration } from '../../util.js';
import { waypointItemTemplate } from './waypoint-item-view-template.js';

const createWaypointItemTemplate = (waypoint, offers, destination) => {
  const { basePrice, type, favorite, dateFrom, dateTo } = waypoint;
  const { name } = destination;

  return waypointItemTemplate({
    dateFrom,
    dateTo,
    type,
    name,
    basePrice,
    favorite,
    offers,
    humanizeTaskDueDate,
    humanizeTaskDueTime,
    getDuration
  });
};

export default class WaypointContentView {
  constructor(waypoint, offers, destination) {
    this.waypoint = waypoint;
    this.offers = offers;
    this.destination = destination;
  }

  getTemplate() {
    return createWaypointItemTemplate(this.waypoint, this.offers, this.destination);
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
