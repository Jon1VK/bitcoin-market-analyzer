import { useEffect, useState } from 'react';
import MarketChart from './components/MarketChart/MarketChart';
import { fetchBitcoinMarketData } from './utils/coinGeckoApi';
import { oneYearBefore, toDateInputValue } from './utils/time';
import * as MarketAnalyzer from './utils/marketAnalyzer';

const MIN_DATE = '2013-04-28';
const INITIAL_START_TIME = oneYearBefore(Date.now());
const INITIAL_END_TIME = Date.now();

function App() {
  // Start date of a range as milliseconds
  const [startTime, setStartTime] = useState(INITIAL_START_TIME);
  // Ending date of a range as milliseconds
  const [endTime, setEndTime] = useState(INITIAL_END_TIME);

  const [prices, setPrices] = useState([]);
  const [volumes, setVolumes] = useState([]);

  useEffect(() => {
    fetchBitcoinMarketData(startTime, endTime).then(({ prices, volumes }) => {
      setPrices(prices);
      setVolumes(volumes);
    });
  }, [startTime, endTime]);

  const longestBearishTrend = MarketAnalyzer.longestBearishTrend(prices);
  const highestTradingVolume = MarketAnalyzer.highestTradingVolume(volumes);
  const maximumProfit = MarketAnalyzer.maximumProfit(prices);

  return (
    <div>
      <header>
        <h1>
          <img src="/logo.svg" width="40" height="40" alt="Bitcoin Icon" />{' '}
          Bitcoin Market Analyzer
        </h1>
      </header>

      <main>
        <div>
          <label htmlFor="fromInput">From:</label>
          <input
            id="fromInput"
            type="date"
            value={toDateInputValue(startTime)}
            min={MIN_DATE}
            max={toDateInputValue(INITIAL_END_TIME)}
            onChange={(e) => setStartTime(new Date(e.target.value).getTime())}
          />
        </div>
        <div>
          <label htmlFor="toInput">To:</label>
          <input
            id="toInput"
            type="date"
            value={toDateInputValue(endTime)}
            min={MIN_DATE}
            max={toDateInputValue(INITIAL_END_TIME)}
            onChange={(e) => setEndTime(new Date(e.target.value).getTime())}
          />
        </div>

        <MarketChart pricesByDate={prices} volumesByDate={volumes} />

        <h2>
          Assignment 1: How many days is the longest bearish (downward) trend
          within a given date range?
        </h2>

        <p>{longestBearishTrend.startDate}</p>
        <p>{longestBearishTrend.endDate}</p>
        <p>{longestBearishTrend.trendLength}</p>

        <h2>
          Assignment 2: Which date within a given date range had the highest
          trading volume?
        </h2>

        <p>{highestTradingVolume.date}</p>
        <p>{highestTradingVolume.volume}</p>

        <h2>
          Assignment 3: For a given date range, what is the best day for buying
          bitcoin, and the best day for selling the bought bitcoin to maximize
          profits?
        </h2>

        <p>{maximumProfit.buyDate}</p>
        <p>{maximumProfit.sellDate}</p>
        <p>{maximumProfit.profit}</p>
      </main>
    </div>
  );
}

export default App;
