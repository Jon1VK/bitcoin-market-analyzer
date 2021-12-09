export function longestBearishTrend(prices) {
  let longest = 0,
    current = 0;

  for (let i = 1; i < prices.length; i++) {
    if (prices[i][1] < prices[i - 1][1]) {
      current++;
    } else {
      current = 0;
    }

    if (current > longest) {
      longest = current;
    }
  }

  return longest;
}

export function highestTradingVolume(volumes) {
  if (volumes.length === 0) {
    return null;
  }

  return volumes.reduce((highest, current) =>
    highest[1] > current[1] ? highest : current
  );
}

export function maximumProfit(prices) {
  let result = {
    profit: 0,
    buyDate: null,
    sellDate: null,
  };

  if (prices.length === 0) {
    return result;
  }

  let minPrice = prices[0];

  for (let i = 1; i < prices.length; i++) {
    const price = prices[i];

    if (price[1] < minPrice[1]) {
      minPrice = price;
    }

    const profit = price[1] - minPrice[1];

    if (profit > result.profit) {
      result = {
        profit,
        buyDate: minPrice[0],
        sellDate: price[0],
      };
    }
  }

  return result;
}
