import MasterPresenter from './presenter/master-presenter.js';
import WaypointsModel from './model/waypoints-model.js';
import OffersModel from './model/offers-model.js';
import DestinationsModel from './model/destinations-model.js';
import WaypointsApiService from './waypoints-api-service.js';
import 'flatpickr/dist/flatpickr.min.css';

const AUTHORIZATION = 'Basic es1d223a9a';
const END_POINT = 'https://22.objects.htmlacademy.pro/big-trip';

const tripMainContainer = document.querySelector('.trip-main');
const tripEventsContainer = document.querySelector('.trip-events');

const waypointsModel = new WaypointsModel({
  waypointsApiService: new WaypointsApiService(END_POINT, AUTHORIZATION)
});
const offersModel = new OffersModel({
  waypointsApiService: new WaypointsApiService(END_POINT, AUTHORIZATION)
});
const destinationsModel = new DestinationsModel({
  waypointsApiService: new WaypointsApiService(END_POINT, AUTHORIZATION)
});


const masterPresenter = new MasterPresenter({
  tripMainContainer,
  tripEventsContainer,
  waypointsModel,
  offersModel,
  destinationsModel
});

masterPresenter.init();
