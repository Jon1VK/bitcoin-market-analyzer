export function toDateInputValue(time) {
  return new Date(time).toISOString().slice(0, 10);
}

export function toUTCDateString(time) {
  return new Date(time).toUTCString().slice(5, 16);
}

export function oneYearBefore(time) {
  const initialDate = new Date(time);
  initialDate.setFullYear(initialDate.getFullYear() - 1);
  return initialDate.getTime();
}
