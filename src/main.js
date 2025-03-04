import MasterPresenter from './presenter/master-presenter.js';
import WaypointsModel from './model/waypoints-model.js';
import OffersModel from './model/offers-model.js';
import DestinationsModel from './model/destinations-model.js';
import 'flatpickr/dist/flatpickr.min.css';

const tripMainContainer = document.querySelector('.trip-main');
const tripEventsContainer = document.querySelector('.trip-events');

const waypointsModel = new WaypointsModel();
const offersModel = new OffersModel();
const destinationsModel = new DestinationsModel();

const masterPresenter = new MasterPresenter({
  tripMainContainer,
  tripEventsContainer,
  waypointsModel,
  offersModel,
  destinationsModel
});

masterPresenter.init();
