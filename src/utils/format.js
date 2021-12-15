// Formats long numbers delimiting them by spaces after every 3 numbers
export function numberWithSpaces(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}
