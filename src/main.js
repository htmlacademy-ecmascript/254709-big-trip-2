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

const waypointsApiService = new WaypointsApiService(END_POINT, AUTHORIZATION);

const waypointsModel = new WaypointsModel();
const offersModel = new OffersModel();
const destinationsModel = new DestinationsModel();

async function runApp() {
  try {
    const destinations = await waypointsApiService.destinations;
    destinationsModel.init(destinations);
    const offers = await waypointsApiService.offers;
    offersModel.init(offers);
    const waypoints = await waypointsApiService.waypoints;
    waypointsModel.init(waypoints);
    const masterPresenter = new MasterPresenter({
      tripMainContainer,
      tripEventsContainer,
      waypointsModel,
      offersModel,
      destinationsModel
    });
    masterPresenter.init();

  } catch (error) {
    throw new Error(error);
  }
}

runApp();
