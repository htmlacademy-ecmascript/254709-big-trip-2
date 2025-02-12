import { createElement } from '../../render.js';
import { sortListTemplate } from './sort-list-view-template.js';

const createSortListTemplate = () => sortListTemplate;

export default class SortListView {
  getTemplate() {
    return createSortListTemplate();
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
