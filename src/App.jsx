import { useEffect, useState } from 'react';
import { fetchBitcoinMarketData } from './utils/coinGeckoApi';
import { oneMonthBefore, toDateInputValue } from './utils/time';
import DateRangeInputs from './components/DateRangeInputs';
import Cards from './components/Cards';
import MarketChart from './components/MarketChart';
import logo from './logo.svg';
import './App.css';

// When the App loads, start time is set to one month before current time
const INITIAL_START_TIME = oneMonthBefore(Date.now());
// And end time is set to current time
const INITIAL_END_TIME = Date.now();

function App() {
  // Start time of the date range as milliseconds
  var [startTime, setStartTime] = useState(INITIAL_START_TIME);
  // End time of the date range as milliseconds
  var [endTime, setEndTime] = useState(INITIAL_END_TIME);
  // Price market data of bitcoin in the selected date range
  var [prices, setPrices] = useState({});
  // Volume market data of bitcoin in the selected date range
  var [volumes, setVolumes] = useState({});

  // Load new bitcoin market data, when the start or end time of the date range changes
  useEffect(() => {
    fetchBitcoinMarketData(startTime, endTime).then(({ prices, volumes }) => {
      setPrices(prices);
      setVolumes(volumes);
    });
  }, [startTime, endTime]);

  function onStartDateChange(e) {
    setStartTime(new Date(e.target.value).getTime() || INITIAL_START_TIME);
  }

  function onEndDateChange(e) {
    setEndTime(new Date(e.target.value).getTime() || INITIAL_END_TIME);
  }

  return (
    <div>
      <header className="header">
        <img src={logo} width="60" height="60" alt="Bitcoin Icon" />
        <h1>Bitcoin Market Analyzer</h1>
      </header>

      <main>
        <h2 className="section-title">The date range to be analyzed</h2>
        <DateRangeInputs
          startDate={toDateInputValue(startTime)}
          endDate={toDateInputValue(endTime)}
          onStartDateChange={onStartDateChange}
          onEndDateChange={onEndDateChange}
        />
        <Cards prices={prices} volumes={volumes} />
        <MarketChart prices={prices} volumes={volumes} />
      </main>
    </div>
  );
}

export default App;
