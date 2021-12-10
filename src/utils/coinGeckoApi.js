import { toUTCDateString } from './time';

const BASE_URL =
  'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range';

export async function fetchBitcoinMarketData(from, to) {
  const response = await fetch(
    `${BASE_URL}?vs_currency=eur&from=${from / 1000}&to=${to / 1000 + 3600}`
  );
  const data = await response.json();

  return {
    prices: oneByDate(data.prices),
    volumes: oneByDate(data.total_volumes),
  };
}

function oneByDate(data) {
  const oneByDate = {};
  data.forEach(([time, value]) => {
    const utcDate = toUTCDateString(time);
    oneByDate[utcDate] = oneByDate[utcDate] || value.toFixed(2);
  });
  return oneByDate;
}
