import { FilterName } from '../../const.js';

const createFiltersTemplate = (filterList) => Object.values(filterList).map((filterItem) => `<div class="trip-filters__filter">
                  <input id="filter-${filterItem.toLowerCase()}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filterItem.toLowerCase()}" ${filterItem === 'EVERYTHING' ? 'checked' : ''}>
                  <label class="trip-filters__filter-label" for="${filterItem.toLowerCase()}">${filterItem}</label>
                </div>`).join('');

export const filterListTemplate = `<form class="trip-filters" action="#" method="get">
                ${createFiltersTemplate(FilterName)}
                <button class="visually-hidden" type="submit">Accept filter</button>
              </form>`;
