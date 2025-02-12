import { createElement } from '../../render.js';
import { POINT_TYPES } from '../../const.js';
import { humanizeTaskDueDate, DATE_FORMAT } from '../../util.js';
import { editFormTemplate } from './edit-form-view-template.js';

const createClassName = (title) => title.toLowerCase().replace(/ /g, '-');

const createEditFormTemplate = (waypoint, offers, destination, offersType, destinationsAll) => {
  const idWaypoints = offers.map((item) => item.id);
  const { type, dateFrom, dateTo, basePrice, id } = waypoint;
  const { name: namePoint, description, pictures } = destination;

  return editFormTemplate({
    id,
    type,
    dateFrom,
    dateTo,
    basePrice,
    namePoint,
    description,
    pictures,
    POINT_TYPES,
    idWaypoints,
    offersType,
    destinationsAll,
    createClassName,
    humanizeTaskDueDate,
    DATE_FORMAT
  });

};
export default class EditFormView {
  constructor({ waypoint, offers, destination, offersType, destinationsAll }) {
    this.waypoint = waypoint;
    this.offers = offers;
    this.description = destination;
    this.offersType = offersType;
    this.destinationsAll = destinationsAll;
  }

  getTemplate() {
    return createEditFormTemplate(this.waypoint, this.offers, this.description, this.offersType, this.destinationsAll);
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
