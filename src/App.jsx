import './app.css';
import { useEffect, useState } from 'react';
import MarketChart from './components/MarketChart';
import { fetchBitcoinMarketData } from './utils/coinGeckoApi';
import { oneMonthBefore, toDateInputValue } from './utils/time';
import * as MarketAnalyzer from './utils/marketAnalyzer';

const MIN_DATE = '2013-04-28';
const INITIAL_START_TIME = oneMonthBefore(Date.now());
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
      <header className="header">
        <img src="/logo.svg" width="60" height="60" alt="Bitcoin Icon" />{' '}
        <h1>Bitcoin Market Analyzer</h1>
      </header>

      <main>
        <h2>Enter the date range to be analyzed</h2>
        <div className="date-inputs">
          <div className="input-group">
            <label htmlFor="fromInput">Start date</label>
            <input
              id="fromInput"
              type="date"
              value={toDateInputValue(startTime)}
              min={MIN_DATE}
              max={toDateInputValue(INITIAL_END_TIME)}
              onChange={(e) =>
                setStartTime(
                  new Date(e.target.value).getTime() || INITIAL_START_TIME
                )
              }
            />
          </div>
          <div className="input-group">
            <label htmlFor="toInput">End date</label>
            <input
              id="toInput"
              type="date"
              value={toDateInputValue(endTime)}
              min={MIN_DATE}
              max={toDateInputValue(INITIAL_END_TIME)}
              onChange={(e) =>
                setEndTime(
                  new Date(e.target.value).getTime() || INITIAL_END_TIME
                )
              }
            />
          </div>
        </div>

        <div className="cards">
          <div className="card">
            <h3>Longest bearish trend</h3>
            <p class="card-focal">{longestBearishTrend.trendLength} days</p>
            <p>
              {longestBearishTrend.startDate} - {longestBearishTrend.endDate}
            </p>
          </div>
          <div className="card">
            <h3>Highest trading volume</h3>
            <p class="card-focal">
              {highestTradingVolume.volume
                .toFixed(0)
                .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}{' '}
              €
            </p>
            <p>{highestTradingVolume.date}</p>
          </div>
          <div className="card">
            <h3>Maximum profit</h3>
            <p class="card-focal">{maximumProfit.profit.toFixed(2)} € / BTC</p>
            <div>
              {maximumProfit.buyDate ? (
                <div>
                  <p>Should be bought on {maximumProfit.buyDate}</p>
                  <p>Should be sold on {maximumProfit.sellDate}</p>
                </div>
              ) : (
                <p>Bitcoin should not be bought on the selected date range</p>
              )}
            </div>
          </div>
        </div>

        <MarketChart pricesByDate={prices} volumesByDate={volumes} />
      </main>
    </div>
  );
}

export default App;
