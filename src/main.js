// import { render, RenderPosition } from './render.js';
import HeaderPresenter from './presenter/header-presenter.js';
import ListPresenter from './presenter/list-presenter.js';


const tripInfoContainer = document.querySelector('.trip-main');
const filterListContainer = tripInfoContainer.querySelector('.trip-controls__filters');
const listContainer = document.querySelector('.trip-events');

const headerPresenter = new HeaderPresenter({tripInfoContainer, filterListContainer});
const listPresenter = new ListPresenter({listContainer});


headerPresenter.init();
listPresenter.init();
