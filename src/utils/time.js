// Converts time in ms to date input value format
export function toDateInputValue(time) {
  return new Date(time).toISOString().slice(0, 10);
}

// Converts time in ms to date string in UTC time
export function toUTCDateString(time) {
  return new Date(time).toUTCString().slice(5, 16);
}

// Given time in ms returns relative time one month before
export function oneMonthBefore(time) {
  const initialDate = new Date(time);
  initialDate.setMonth(initialDate.getMonth() - 1);
  return initialDate.getTime();
}
