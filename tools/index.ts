/**
 * The zeroPad function in TypeScript pads a number with zeros to a specified length.
 * @param {number} num - The `num` parameter is the number that you want to zero-pad.
 * @param {number} places - The `places` parameter in the `zeroPad` function represents the total
 * number of characters the resulting string should have after padding the number `num` with zeros.
 */
export const zeroPad = (num: number, places: number) =>
  String(num).padStart(places, '0');
