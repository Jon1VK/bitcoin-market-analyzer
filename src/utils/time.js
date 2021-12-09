export function toDateInputValue(time) {
  return new Date(time).toISOString().slice(0, 10);
}

export function toUTCDateString(time) {
  return new Date(time).toUTCString().slice(0, 16);
}
