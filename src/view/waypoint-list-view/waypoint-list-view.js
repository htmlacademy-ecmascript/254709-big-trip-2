import AbstractView from '../../framework/view/abstract-view.js';
import { waypointListTemplate } from '../waypoint-item-view/waypoint-item-view-template.js';

const createWaypointListTemplate = () => waypointListTemplate;

export default class WaypointListView extends AbstractView {
  get template() {
    return createWaypointListTemplate();
  }
}
