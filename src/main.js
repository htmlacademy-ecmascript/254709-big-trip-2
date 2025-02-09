// import { render, RenderPosition } from './render.js';
import WaypointModel from './model/waypoint-model.js';

import HeaderPresenter from './presenter/header-presenter.js';
import ListPresenter from './presenter/list-presenter.js';

const tripInfoContainer = document.querySelector('.trip-main');
const filterListContainer = tripInfoContainer.querySelector('.trip-controls__filters');
const listContainer = document.querySelector('.trip-events');

const waypointModel = new WaypointModel();

const headerPresenter = new HeaderPresenter({tripInfoContainer, filterListContainer});
const listPresenter = new ListPresenter({ listContainer: listContainer, waypointModel });
headerPresenter.init();
listPresenter.init();
