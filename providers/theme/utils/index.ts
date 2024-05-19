import {GalioProviderProps, theme} from 'galio-framework';

export const BASE_UNIT = 14;
export const THEME: GalioProviderProps['theme'] = {
  ...theme,
  COLORS: {
    ...theme.COLORS,
    BLACK: 'rgba(0, 0, 0, 0.6)',
    DARK: '#333',
    PRIMARY: '#B172FF',
    WHITE: '#FFFFFF',
    LIGHT: '#fafafa',
    THEME: '#013138',
  },
  SIZES: {
    ...theme.SIZES,
    BUTTON_HEIGHT: BASE_UNIT * 3.5,
    INPUT_HEIGHT: BASE_UNIT * 3.5,
    BASE: BASE_UNIT,
  },
};
