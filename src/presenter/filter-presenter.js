import { render } from '../framework/render.js';
import FilterContentView from '../view/filter-list-view/filter-list-view.js';


export default class FilterPresenter {
  #filtersListContainer = null;
  #filterListView = new FilterContentView({isViewList: true});
  #filterItemView = null;
  #filtersModel = null;


  constructor({ filtersListContainer, filtersModel }) {
    this.#filtersListContainer = filtersListContainer;
    this.#filtersModel = filtersModel;
  }

  init() {
    this.#renderAllFilters();
  }



  #renderAllFilters = () => {
    render(this.#filterListView, this.#filtersListContainer);

    const allFilters = [...this.#filtersModel.allFilters];
    allFilters.forEach((filter) => {
      this.#renderFilter(filter);
    });
  };

  #renderFilter = (filter) => {
    const { id, name, value, checked } = filter;
    this.#filterItemView = new FilterContentView({
      id,
      name,
      value,
      checked,
      isViewList: false});
    render(this.#filterItemView, this.#filterListView.element);
  };
}
