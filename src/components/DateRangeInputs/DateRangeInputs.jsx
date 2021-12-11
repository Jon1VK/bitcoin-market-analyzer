import { toDateInputValue } from '../../utils/time';
import './DateRangeInputs.css';

const MIN_DATE = '2013-04-28';

function DateRangeInputs({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}) {
  return (
    <div className="date-inputs">
      <div className="input-group">
        <label htmlFor="fromInput">Start date</label>
        <input
          id="fromInput"
          type="date"
          value={startDate}
          min={MIN_DATE}
          max={toDateInputValue(Date.now())}
          onChange={onStartDateChange}
        />
      </div>
      <div className="input-group">
        <label htmlFor="toInput">End date</label>
        <input
          id="toInput"
          type="date"
          value={endDate}
          min={MIN_DATE}
          max={toDateInputValue(Date.now())}
          onChange={onEndDateChange}
        />
      </div>
    </div>
  );
}

export default DateRangeInputs;
