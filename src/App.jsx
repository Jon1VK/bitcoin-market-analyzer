import { useEffect, useState } from 'react';
import { fetchBitcoinMarketData } from './utils/coinGeckoApi';
import { oneMonthBefore, toDateInputValue } from './utils/time';
import DateRangeInputs from './components/DateRangeInputs';
import Cards from './components/Cards';
import MarketChart from './components/MarketChart';
import logo from './logo.svg';
import './App.css';

const INITIAL_START_TIME = oneMonthBefore(Date.now());
const INITIAL_END_TIME = Date.now();

function App() {
  const [startTime, setStartTime] = useState(INITIAL_START_TIME);
  const [endTime, setEndTime] = useState(INITIAL_END_TIME);
  const [prices, setPrices] = useState([]);
  const [volumes, setVolumes] = useState([]);

  useEffect(() => {
    fetchBitcoinMarketData(startTime, endTime).then(({ prices, volumes }) => {
      setPrices(prices);
      setVolumes(volumes);
    });
  }, [startTime, endTime]);

  const onStartDateChange = (e) =>
    setStartTime(new Date(e.target.value).getTime() || INITIAL_START_TIME);

  const onEndDateChange = (e) =>
    setEndTime(new Date(e.target.value).getTime() || INITIAL_END_TIME);

  return (
    <div>
      <header className="header">
        <img src={logo} width="60" height="60" alt="Bitcoin Icon" />
        <h1>Bitcoin Market Analyzer</h1>
      </header>

      <main>
        <h2 class="section-title">The date range to be analyzed</h2>
        <DateRangeInputs
          startDate={toDateInputValue(startTime)}
          endDate={toDateInputValue(endTime)}
          onStartDateChange={onStartDateChange}
          onEndDateChange={onEndDateChange}
        />
        <Cards prices={prices} volumes={volumes} />
        <MarketChart pricesByDate={prices} volumesByDate={volumes} />
      </main>
    </div>
  );
}

export default App;
