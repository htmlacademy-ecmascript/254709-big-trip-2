import AbstractView from '../../framework/view/abstract-view.js';
import { filterListTemplate, filterItemTemplate } from '../filter-list-view/filter-list-view-template.js';

const createFilterListTemplate = () => filterListTemplate;
const createFilterItemTemplate = ({ id, name, value, checked}) => filterItemTemplate;

export default class FilterContentView extends AbstractView {
  #isViewList = null;
  #id = null;
  #name = null;
  #value = null;
  #checked = null

  constructor({ id, name, value, checked, isViewList = false }){
    super();
    this.#id = id;
    this.#name = name;
    this.#value = value;
    this.#checked = checked;
    this.#isViewList = isViewList;
  }


  get template() {
    if (this.#isViewList) {
      return createFilterListTemplate();
    }
    console.log(this.#id);
    return createFilterItemTemplate(this.#id, this.#name, this.#value, this.#isViewList);
  }
}
