import AbstractView from '../../framework/view/abstract-view.js';
import { POINT_TYPES } from '../../const.js';
import { humanizeTaskDueDate, DATE_FORMAT } from '../../util.js';
import { editFormTemplate } from './edit-form-view-template.js';

const createClassName = (title) => title.toLowerCase().replace(/ /g, '-');

const createEditFormTemplate = (waypoint, offers, destination, offerType, destinationsAll) => {
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
    offerType,
    destinationsAll,
    createClassName,
    humanizeTaskDueDate,
    DATE_FORMAT
  });

};
export default class EditFormView extends AbstractView {
  constructor({ waypoint, offers, destination, offerType, destinationsAll }) {
    super();
    this.waypoint = waypoint;
    this.offers = offers;
    this.description = destination;
    this.offerType = offerType;
    this.destinationsAll = destinationsAll;
  }

  get template() {
    return createEditFormTemplate(this.waypoint, this.offers, this.description, this.offerType, this.destinationsAll);
  }
}
