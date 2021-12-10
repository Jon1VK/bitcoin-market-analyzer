export function longestBearishTrend(pricesByDate) {
  let result = {
    startDate: null,
    endDate: null,
    trendLength: 0,
  };

  let startDate, endDate, trendLength;

  Object.entries(pricesByDate).forEach(([date, price], index, array) => {
    if (index === 0 || price >= array[index - 1][1]) {
      startDate = date;
      trendLength = 0;
      return;
    }

    trendLength++;
    endDate = date;

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

export function highestTradingVolume(volumesByDate) {
  let result = {
    date: null,
    volume: 0,
  };

  function highestVolumeReducer(result, [date, volume]) {
    return volume > result.volume ? { date, volume } : result;
  }

  return Object.entries(volumesByDate).reduce(highestVolumeReducer, result);
}

export function maximumProfit(pricesByDate) {
  let result = {
    buyDate: null,
    sellDate: null,
    profit: 0,
  };

  let buyDate, minimumPrice;

  Object.entries(pricesByDate).forEach(([date, price], index) => {
    if (index === 0 || price < minimumPrice) {
      minimumPrice = price;
      buyDate = date;
      return;
    }

    const profit = price - minimumPrice;

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
