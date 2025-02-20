import { render, RenderPosition } from '../framework/render.js';
import SortListView from '../view/sort-list-view/sort-list-view.js';

export default class SortListPresenter {

  #sortListComponent = new SortListView({
    onSortTypeChange: (dataset) => {
      this.#handleSortTypeChange(dataset);
    },
  });

  #listContainer = null;

  constructor({ listContainer }) {
    this.#listContainer = listContainer;
  }

  init() {
    this.#renderSortList();
  }

  #renderSortList() {
    render(this.#sortListComponent, this.#listContainer, RenderPosition.AFTERBEGIN);
  }

  #handleSortTypeChange = (dataset) => {

  };

}
