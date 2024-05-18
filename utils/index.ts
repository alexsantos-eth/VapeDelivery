import {THEME} from '../providers/theme/utils';

/**
 * The function `getUnit` calculates the size based on a unit value and a base theme size.
 * @param {number} unit - The `getUnit` function takes a `unit` parameter, which is a number
 * representing the multiplier for the base size defined in the `THEME.SIZES.BASE` property.
 * @returns The function `getUnit` returns the result of multiplying the value of `THEME.SIZES.BASE`
 * (if it exists, otherwise 0) by the `unit` parameter.
 */
export const getUnit = (unit: number) => {
  return ((THEME.SIZES?.BASE || 0) / 2) * unit;
};
