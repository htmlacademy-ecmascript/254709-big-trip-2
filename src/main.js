// import { render, RenderPosition } from './render.js';
import WaypointsModel from './model/waypoints-model.js';
import OffersModel from './model/offers-model.js';
import DestinationsModel from './model/destinations-model.js';
import FiltersModel from './model/filters-model.js';

import HeaderPresenter from './presenter/header-presenter.js';
import ListPresenter from './presenter/list-presenter.js';

const tripInfoContainer = document.querySelector('.trip-main');
const filtersListContainer = tripInfoContainer.querySelector('.trip-controls__filters');
const listContainer = document.querySelector('.trip-events');

const waypointsModel = new WaypointsModel();
const offersModel = new OffersModel();
const destinationsModel = new DestinationsModel();
const filtersModel = new FiltersModel();

const headerPresenter = new HeaderPresenter({ tripInfoContainer, filtersListContainer, filtersModel });
const listPresenter = new ListPresenter({ listContainer: listContainer, waypointsModel, offersModel, destinationsModel });
headerPresenter.init();
listPresenter.init();
