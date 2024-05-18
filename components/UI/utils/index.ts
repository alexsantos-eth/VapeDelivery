import {THEME} from '../../../providers/theme/utils';
import {StyledLayoutProps} from '../types';

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

export const getLayoutStyles = (props: StyledLayoutProps) => {
  const {
    mt = 0,
    mb = 0,
    ml = 0,
    mr = 0,
    m = 0,
    mx = 0,
    my = 0,
    p = 0,
    pt = 0,
    pb = 0,
    pl = 0,
    pr = 0,
    px = 0,
    py = 0,
    w = 0,
    outline = false,
    fullWidth = true,
    direction = 'column',
    alignItems = 'flex-start',
    justifyContent = 'flex-start',
    borderRadius = getUnit(2),
    background,
  } = props;

  const layoutProps: Record<string, string | number | undefined> = {
    marginTop: getUnit(m || my || mt),
    marginBottom: getUnit(m || my || mb),
    marginLeft: getUnit(m || mx || ml),
    marginRight: getUnit(m || mx || mr),

    paddingTop: getUnit(p || py || pt),
    paddingBottom: getUnit(p || py || pb),
    paddingLeft: getUnit(p || px || pl),
    paddingRight: getUnit(p || px || pr),

    borderRadius,

    width: w ? w : fullWidth ? '100%' : 'auto',
    flex: props.flex,

    backgroundColor: background
      ? THEME.COLORS?.[background.toUpperCase()]
      : undefined,

    flexDirection: direction,
    alignItems,
    justifyContent,
  };

  if (outline) {
    layoutProps.borderWidth = 1;
    layoutProps.borderColor = THEME.COLORS?.MUTED;
  }

  // FILTER
  Object.keys(layoutProps).forEach(
    key => layoutProps[key] === undefined && delete layoutProps[key],
  );

  return layoutProps;
};
