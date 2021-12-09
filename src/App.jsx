import { useState } from 'react';
import { toDateInputValue, relativeDate } from './utils/date';

function App() {
  const currentDate = new Date();
  const yearAgoDate = relativeDate(currentDate, -1);

  const [startDate, setStartDate] = useState(toDateInputValue(yearAgoDate));
  const [endDate, setEndDate] = useState(toDateInputValue(currentDate));

  return (
    <div>
      <h1>Bitcoin Market Analyzer</h1>
      <input
        type="date"
        value={startDate}
        min="2009-01-03" // Bitcoin came into existence
        max={toDateInputValue(currentDate)}
        onChange={(e) => setStartDate(e.target.value)}
      />
      <input
        type="date"
        value={endDate}
        min="2009-01-03" // Bitcoin came into existence
        max={toDateInputValue(currentDate)}
        onChange={(e) => setEndDate(e.target.value)}
      />

      <p>Start date: {startDate}</p>
      <p>End date: {endDate}</p>
    </div>
  );
}

export default App;
