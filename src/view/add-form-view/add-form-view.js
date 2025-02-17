import AbstractView from '../../framework/view/abstract-view.js';
import { addFormViewTemplate } from './add-form-view-template.js';

const createAddFormTemplate = () => addFormViewTemplate;

export default class AddFormView extends AbstractView {
  get template() {
    return createAddFormTemplate();
  }
}
