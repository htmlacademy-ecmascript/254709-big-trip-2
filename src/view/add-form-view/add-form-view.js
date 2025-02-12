import { createElement } from '../../render.js';
import { addFormViewTemplate } from './add-form-view-template.js';

const createAddFormTemplate = () => addFormViewTemplate;

export default class AddFormView {
  getTemplate() {
    return createAddFormTemplate();
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
