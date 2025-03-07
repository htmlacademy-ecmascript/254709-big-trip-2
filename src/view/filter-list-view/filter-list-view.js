import AbstractView from '../../framework/view/abstract-view.js';
import { filterListTemplate } from '../filter-list-view/filter-list-view-template.js';
export default class FilterListView extends AbstractView {

  constructor(){
    super();
  }

  get template() {
    return filterListTemplate;
  }
}
