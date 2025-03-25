export const tripInfoTemplate = (totalPrice, tripRoute, tripDuration) => (`
          <section class="trip-main__trip-info  trip-info">
            <div class="trip-info__main">
              <h1 class="trip-info__title">${tripRoute}</h1>

              <p class="trip-info__dates">${tripDuration}</p>
            </div>

            <p class="trip-info__cost">
              Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalPrice}</span>
            </p>
          </section>
  `);
