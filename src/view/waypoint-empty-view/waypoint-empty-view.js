import AbstractView from '../../framework/view/abstract-view.js';
import { waypointEmptyTemplate } from './waypoint-empty-view.-template.js';

const createWaypointEmptyTemplate = () => waypointEmptyTemplate;

export default class WaypointEmptyView extends AbstractView {
  get template() {
    return createWaypointEmptyTemplate();
  }
}
