import { remove, render, RenderPosition } from '../framework/render.js';
import { SortType } from '../const.js';
import SortListView from '../view/sort-list-view/sort-list-view.js';

export default class SortListPresenter {
  #listContainer = null;
  #handleSortTypeChange = null;

  constructor({ listContainer, onSortTypeChange }) {
    this.#listContainer = listContainer;
    this.#handleSortTypeChange = onSortTypeChange;
  }

  init() {
    this.#renderSortList();
  }

  resetSortType() {
    this.#handleSortTypeChange({ sortType: `${SortType.DAY.NAME}` });
    this.#sortListComponent.reset();
  }

  destroy() {
    remove(this.#sortListComponent);
  }

  #renderSortList = () => {
    render(this.#sortListComponent, this.#listContainer, RenderPosition.AFTERBEGIN);
  };

  #sortListComponent = new SortListView({
    onSortTypeChange: (dataset) => {
      this.#handleSortTypeChange(dataset);
    },
  });


}
