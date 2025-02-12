import { createElement } from '../../render.js';
import { filterListTemplate } from './filter-list-view-template.js';

const createFilterListTemplate = () => filterListTemplate;

export default class FilterListView {
  getTemplate() {
    return createFilterListTemplate();
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
