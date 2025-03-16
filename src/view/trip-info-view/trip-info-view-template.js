export const tripInfoTemplate = (price, destinationsString) => {

  console.log(destinationsString);

  return (`
          <section class="trip-main__trip-info  trip-info">
            <div class="trip-info__main">
              <h1 class="trip-info__title">${destinationsString}</h1>

              <p class="trip-info__dates">18&nbsp;&mdash;&nbsp;20 Mar</p>
            </div>

            <p class="trip-info__cost">
              Total: &euro;&nbsp;<span class="trip-info__cost-value">${price}</span>
            </p>
          </section>
  `);
};
