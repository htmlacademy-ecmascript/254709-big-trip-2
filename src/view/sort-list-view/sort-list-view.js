import AbstractView from '../../framework/view/abstract-view.js';
import { sortListTemplate } from './sort-list-view-template.js';

const createSortListTemplate = () => sortListTemplate;

export default class SortListView extends AbstractView {
  #handleSortTypeChange = null;

  constructor({ onSortTypeChange }) {
    super();
    this.#handleSortTypeChange = onSortTypeChange;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }

  get template() {
    return createSortListTemplate();
  }

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'LABEL') {
      return;
    }

    evt.preventDefault();
    const inputId = evt.target.getAttribute('for');
    const currentInput = this.element.querySelector(`#${inputId}`);

    if (currentInput && !currentInput.hasAttribute('disabled') && !currentInput.hasAttribute('checked')) {
      const activeInputs = this.element.querySelectorAll('.trip-sort__input:not([disabled])');
      activeInputs.forEach((input) => {
        input.removeAttribute('checked', '');
      });
      currentInput.setAttribute('checked', '');
      this.#handleSortTypeChange(evt.target.dataset);
    }
  };

}
