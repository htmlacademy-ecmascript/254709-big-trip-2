import AbstractView from '../../framework/view/abstract-view.js';
import { waypointEmptyTemplate } from './waypoint-empty-view.-template.js';
import { remove } from '../../framework/render.js';

const createEmptyTemplate = (msg) => waypointEmptyTemplate(msg);
export default class WaypointEmptyView extends AbstractView {
  #msg = null;

  constructor(msg){
    super();
    this.#msg = msg;

  }

  get template() {
    return createEmptyTemplate(this.#msg);
  }

  destroy() {
    remove(this);
  }
}
