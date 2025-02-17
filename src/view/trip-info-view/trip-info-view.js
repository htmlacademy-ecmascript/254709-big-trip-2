import AbstractView from '../../framework/view/abstract-view.js';
import { tripInfoTemplate } from './trip-info-view-template.js';

const createTripInfoTemplate = () => tripInfoTemplate;

export default class TripInfoView extends AbstractView {
  get template() {
    return createTripInfoTemplate();
  }
}
