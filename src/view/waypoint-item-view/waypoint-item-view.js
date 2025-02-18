import AbstractView from '../../framework/view/abstract-view.js';
import { humanizeTaskDueDate, humanizeTaskDueTime, getDuration } from '../../utils/waypoints.js';
import { waypointListTemplate, waypointItemTemplate } from './waypoint-item-view-template.js';

const createWaypointListTemplate = () => waypointListTemplate;

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

export default class WaypointContentView extends AbstractView {
  #waypoint = null;
  #offers = null;
  #destination = null;
  #onEditClick = null;
  #isListView = null;

  constructor({ waypoint, offers, destination, onEditClick, isListView = false }) {
    super();
    this.#waypoint = waypoint;
    this.#offers = offers;
    this.#destination = destination;
    this.#onEditClick = onEditClick;
    this.#isListView = isListView;

    if (!this.#isListView) {
      this.#registerEvents();
    }
  }

  #registerEvents () {
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
  }

  get template() {
    if (this.#isListView) {
      return createWaypointListTemplate();
    }
    return createWaypointItemTemplate(this.#waypoint, this.#offers, this.#destination);
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.#onEditClick();
  };
}
