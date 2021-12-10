import { useEffect, useState } from 'react';
import { fetchBitcoinMarketData } from './utils/coinGeckoApi';
import {
  highestTradingVolume,
  longestBearishTrend,
  maximumProfit,
} from './utils/marketAnalyzer';
import { toDateInputValue } from './utils/time';

// First date CoinGecko has bitcoin data
const initialStartTime = new Date('2013-04-28').getTime();
const initialEndTime = Date.now();

function App() {
  // Start date of a range as milliseconds
  const [startTime, setStartTime] = useState(initialStartTime);
  // Ending date of a range as milliseconds
  const [endTime, setEndTime] = useState(initialEndTime);

  const [prices, setPrices] = useState([]);
  const [volumes, setVolumes] = useState([]);

  useEffect(() => {
    fetchBitcoinMarketData(startTime, endTime).then(({ prices, volumes }) => {
      setPrices(prices);
      setVolumes(volumes);
    });
  }, [startTime, endTime]);

  const longestTrend = longestBearishTrend(prices);
  const highestVolume = highestTradingVolume(volumes);
  const maximumProfitObj = maximumProfit(prices);

  return (
    <div>
      <h1>Bitcoin Market Analyzer</h1>
      <div>
        <label htmlFor="fromInput">From:</label>
        <input
          id="fromInput"
          type="date"
          value={toDateInputValue(startTime)}
          min={toDateInputValue(initialStartTime)}
          max={toDateInputValue(initialEndTime)}
          onChange={(e) => setStartTime(new Date(e.target.value).getTime())}
        />
      </div>
      <div>
        <label htmlFor="toInput">To:</label>
        <input
          id="toInput"
          type="date"
          value={toDateInputValue(endTime)}
          min={toDateInputValue(initialStartTime)}
          max={toDateInputValue(initialEndTime)}
          onChange={(e) => setEndTime(new Date(e.target.value).getTime())}
        />
      </div>

      <h2>
        Assignment 1: How many days is the longest bearish (downward) trend
        within a given date range?
      </h2>

      <p>{longestTrend.startDate}</p>
      <p>{longestTrend.endDate}</p>
      <p>{longestTrend.trendLength}</p>

      <h2>
        Assignment 2: Which date within a given date range had the highest
        trading volume?
      </h2>

      <p>{highestVolume.date}</p>
      <p>{highestVolume.volume}</p>

      <h2>
        Assignment 3: For a given date range, what is the best day for buying
        bitcoin, and the best day for selling the bought bitcoin to maximize
        profits?
      </h2>

      <p>{maximumProfitObj.buyDate}</p>
      <p>{maximumProfitObj.sellDate}</p>
      <p>{maximumProfitObj.profit}</p>
    </div>
  );
}

export default App;
