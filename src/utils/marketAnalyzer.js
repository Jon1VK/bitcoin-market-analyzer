/*
 * Given prices object with one entry per day iteration ordered by day
 * calculates longest bearish (downward) trend for the prices.
 * Returns start date, end date and length of the longest trend
 */
export function longestBearishTrend(prices) {
  var result = {
    startDate: null,
    endDate: null,
    trendLength: 0,
  };

  var startDate, endDate, trendLength;

  Object.entries(prices).forEach(([date, price], index, array) => {
    // If at first entry or previous day price was lower than current day price
    // initialize start date to current date and trend length to zero
    if (index === 0 || price >= array[index - 1][1]) {
      startDate = date;
      trendLength = 0;
      return;
    }

    // Otherwise bearish trend continues
    trendLength++;
    endDate = date;

    // If currently observed trend is longer than longest already seen trend
    // Update result accordingly
    if (trendLength > result.trendLength) {
      result = {
        startDate,
        endDate,
        trendLength,
      };
    }
  });

  return result;
}

/*
 * Gets the day and volume of the given volumes object with one entry per day
 */
export function highestTradingVolume(volumes) {
  var result = {
    date: null,
    volume: 0,
  };

  // Reducer function to find out the day and volume of the highest volume entry
  function highestVolumeReducer(result, [date, volume]) {
    return volume > result.volume ? { date, volume } : result;
  }

  return Object.entries(volumes).reduce(highestVolumeReducer, result);
}

/*
 * Given prices object with one entry per day iteration ordered by day
 * calculates maximum profit for the prices.
 * Returns buy date, sell date and maximum profit
 */
export function maximumProfit(prices) {
  var result = {
    buyDate: null,
    sellDate: null,
    profit: 0,
  };

  var buyDate, minimumPrice;

  Object.entries(prices).forEach(([date, price], index) => {
    // If at first index or even lower buying price than current lowest is found
    // Update min price and buying date accordingly
    if (index === 0 || price < minimumPrice) {
      minimumPrice = price;
      buyDate = date;
      return;
    }

    // Otherwise calculate profit if item was bought with min price and sold with current price
    const profit = price - minimumPrice;

    // If profit is higher than highest seen profit, update result accordingly
    if (profit > result.profit) {
      result = {
        buyDate,
        sellDate: date,
        profit,
      };
    }
  });

  return result;
}
