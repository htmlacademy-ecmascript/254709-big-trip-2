import AbstractView from '../../framework/view/abstract-view.js';
import { filterListTemplate } from '../filter-list-view/filter-list-view-template.js';

const createFilterListTemplate = () => filterListTemplate;

export default class FilterListView extends AbstractView {
  get template() {
    return createFilterListTemplate();
  }
}
