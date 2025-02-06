import { render } from '../render.js';
import SortListView from '../view/sort-list-view.js';
import WaypointListView from '../view/waypoint-list-view.js';
import WaypointItemView from '../view/waypoint-item-view.js';
import WaypointContentView from '../view/waypoint-content-view.js';
import EditFormView from '../view/edit-form-view.js';
import AddFormView from '../view/add-form-view.js';

const WAYPOINT_ITEM_QTY = 3;

export default class ListPresenter {
  waypointListElement = new WaypointListView();
  waypointItemElement = new WaypointItemView();
  editFormElement = new WaypointItemView();
  addFormElement = new WaypointItemView();

  constructor({ listContainer }) {
    this.listContainer = listContainer;
  }

  init() {
    render(new SortListView(), this.listContainer);

    render(this.waypointListElement, this.listContainer);

    render(this.editFormElement, this.waypointListElement.getElement());
    render(new EditFormView(), this.editFormElement.getElement());

    render(this.addFormElement, this.waypointListElement.getElement());
    render(new AddFormView(), this.addFormElement.getElement());

    for (let i = 0; i < WAYPOINT_ITEM_QTY; i++) {
      const waypointContainer = new WaypointItemView();
      render(waypointContainer, this.waypointListElement.getElement());
      render(new WaypointContentView(), waypointContainer.getElement());
    }
  }
}
