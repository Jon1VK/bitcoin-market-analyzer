export function toDateInputValue(date) {
  return date.toISOString().slice(0, 10);
}

export function relativeDate(date, yearDelta = 0) {
  const newDate = new Date(date);
  newDate.setFullYear(date.getFullYear() + yearDelta);
  return newDate;
}
