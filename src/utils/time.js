export function toDateInputValue(time) {
  return new Date(time).toISOString().slice(0, 10);
}

export function toUTCDateString(time) {
  return new Date(time).toUTCString().slice(5, 16);
}

export function oneMonthBefore(time) {
  const initialDate = new Date(time);
  initialDate.setMonth(initialDate.getMonth() - 1);
  return initialDate.getTime();
}
