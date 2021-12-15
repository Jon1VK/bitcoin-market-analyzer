import { toUTCDateString } from './time';

const BASE_URL =
  'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range';

/*
 * Fetches bitcoin market data between from and to times in milliseconds.
 * Returns an object with prices and volumes properties.
 * Prices and volumes are returned as objects containing one entry for each day.
 */
export async function fetchBitcoinMarketData(from, to) {
  var response = await fetch(
    `${BASE_URL}?vs_currency=eur&from=${from / 1000}&to=${to / 1000 + 3600}`
  );

  var data = await response.json();

  return {
    prices: oneByDate(data.prices),
    volumes: oneByDate(data.total_volumes),
  };
}

/*
 * Converts data array with entries in format of [time, value] to an object
 * which has only one entry per day. Other entries are discarded.
 * The iterating order of the data array is preserved and the first seen entry
 * for one day is always selected.
 */
function oneByDate(data) {
  var oneByDate = {};
  data.forEach(([time, value]) => {
    let utcDate = toUTCDateString(time);
    oneByDate[utcDate] = oneByDate[utcDate] || value;
  });
  return oneByDate;
}
