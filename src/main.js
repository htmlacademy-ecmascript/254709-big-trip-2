import BigTripPresenter from './presenter/big-trip-presenter.js';
import WaypointsModel from './model/waypoints-model.js';
import OffersModel from './model/offers-model.js';
import DestinationsModel from './model/destinations-model.js';
import FiltersModel from './model/filters-model.js';

const tripMainContainer = document.querySelector('.trip-main');
const tripEventsContainer = document.querySelector('.trip-events');

const waypointsModel = new WaypointsModel();
const offersModel = new OffersModel();
const destinationsModel = new DestinationsModel();
const filtersModel = new FiltersModel();

const bigTripPresenter = new BigTripPresenter({
  tripMainContainer,
  tripEventsContainer,
  waypointsModel,
  offersModel,
  destinationsModel,
  filtersModel
});

bigTripPresenter.init();
