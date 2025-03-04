import { SortType } from '../../const.js';

const createFiltersTemplate = (sortType) => Object.values(sortType).map((sortItem) => `<div class="trip-sort__item trip-sort__item--${sortItem.NAME.toLowerCase()}">
              <input id="sort-${sortItem.NAME.toLowerCase()}" class="trip-sort__input visually-hidden" type="radio" name="trip-sort" value="sort-${sortItem.NAME.toLowerCase()}" ${sortItem.NAME === 'DAY' ? 'checked' : ''} ${sortItem.DISABLED ? 'disabled' : ''}>
              <label class="trip-sort__btn" for="sort-${sortItem.NAME.toLowerCase()}" data-sort-type='${sortItem.NAME}'>${sortItem.NAME}</label>
            </div>`).join('');

export const sortListTemplate = `<form class="trip-events__trip-sort trip-sort" action="#" method="get">
              ${createFiltersTemplate(SortType)}
          </form>`;
