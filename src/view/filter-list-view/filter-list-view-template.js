export const createFilterItemTemplate = (id, name, value, checked) => `<div class="trip-filters__filter">
                  <input id="${id}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${value}" ${checked ? 'checked' : ''}>
                  <label class="trip-filters__filter-label" for="${id}">${name}</label>
                </div>`;

export const filterListTemplate = `<form class="trip-filters" action="#" method="get">
                <button class="visually-hidden" type="submit">Accept filter</button>
              </form>`;
