import MasterPresenter from './presenter/master-presenter.js';
import WaypointsModel from './model/waypoints-model.js';
import OffersModel from './model/offers-model.js';
import DestinationsModel from './model/destinations-model.js';
import WaypointsApiService from './waypoints-api-service.js';
import WaypointEmptyView from './view/waypoint-empty-view/waypoint-empty-view.js';
import FilterPresenter from './presenter/filter-presenter.js';
import { EventsMsg } from './const.js';
import { render } from './framework/render.js';
import 'flatpickr/dist/flatpickr.min.css';

const AUTHORIZATION = 'Basic es1d223a9a';
const END_POINT = 'https://22.objects.htmlacademy.pro/big-trip';

const tripMainContainer = document.querySelector('.trip-main');
const filtersListContainer = tripMainContainer.querySelector('.trip-controls__filters');
const tripEventsContainer = document.querySelector('.trip-events');
const newWaypointBtn = document.querySelector('.trip-main__event-add-btn');

const waypointsApiService = new WaypointsApiService(END_POINT, AUTHORIZATION);

const waypointsModel = new WaypointsModel({ waypointsApiService });
const offersModel = new OffersModel();
const destinationsModel = new DestinationsModel();

const filterPresenter = new FilterPresenter({
  filtersListContainer,
  waypointsModel,
  onFilterChange: () => {
  }
});

async function runApp() {
  try {
    newWaypointBtn.setAttribute('disabled', '');
    filterPresenter.init();

    const loadingMsgComponent = new WaypointEmptyView(EventsMsg.LOADING);
    render(loadingMsgComponent, tripEventsContainer);

    const destinations = await waypointsApiService.destinations;
    destinationsModel.init(destinations);
    const offers = await waypointsApiService.offers;
    offersModel.init(offers);
    const waypoints = await waypointsApiService.waypoints;
    waypointsModel.init(waypoints);
    loadingMsgComponent.destroy();
    newWaypointBtn.removeAttribute('disabled', '');

    const masterPresenter = new MasterPresenter({
      tripMainContainer,
      tripEventsContainer,
      waypointsModel,
      offersModel,
      destinationsModel,
      filterPresenter
    });
    masterPresenter.init();

  } catch(error) {
    tripEventsContainer.innerHTML = '';
    newWaypointBtn.setAttribute('disabled', '');
    const errorMsgComponent = new WaypointEmptyView(EventsMsg.ERROR);
    render(errorMsgComponent, tripEventsContainer);
  }
}

runApp();
