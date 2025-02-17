import AbstractView from '../../framework/view/abstract-view.js';
import { sortListTemplate } from './sort-list-view-template.js';

const createSortListTemplate = () => sortListTemplate;

export default class SortListView extends AbstractView {
  get template() {
    return createSortListTemplate();
  }
}
