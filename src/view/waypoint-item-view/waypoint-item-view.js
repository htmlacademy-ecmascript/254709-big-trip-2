import AbstractView from '../../framework/view/abstract-view.js';
import { humanizeTaskDueDate, humanizeTaskDueTime, getDuration } from '../../utils/waypoints.js';
import { waypointItemTemplate } from './waypoint-item-view-template.js';


const createWaypointItemTemplate = (waypoint, offers, destination) => {
  const { basePrice, type, isFavorite , dateFrom, dateTo } = waypoint;
  const { name } = destination;

  return waypointItemTemplate({
    dateFrom,
    dateTo,
    type,
    name,
    basePrice,
    isFavorite,
    offers,
    humanizeTaskDueDate,
    humanizeTaskDueTime,
    getDuration
  });
};

export default class WaypointItemView extends AbstractView {
  #waypoint = null;
  #offers = null;
  #destination = null;
  #onEditClick = null;
  #onFavoriteClick = null;

  constructor({ waypoint, offers, destination, onEditClick, onFavoriteClick }) {
    super();
    this.#waypoint = waypoint;
    this.#offers = offers;
    this.#destination = destination;
    this.#onEditClick = onEditClick;
    this.#onFavoriteClick = onFavoriteClick;
    this.#registerEvents();
  }

  get template() {
    return createWaypointItemTemplate(this.#waypoint, this.#offers, this.#destination);
  }

  #registerEvents() {
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#favoriteClickHandler);
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.#onEditClick();
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this.#onFavoriteClick();
  };
}
