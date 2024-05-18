import {GalioProviderProps, theme} from 'galio-framework';

export const BASE_UNIT = 14;
export const THEME: GalioProviderProps['theme'] = {
  ...theme,
  COLORS: {
    ...theme.COLORS,
    BLACK: '#666',
    DARK: '#333',
    PRIMARY: '#B172FF',
    WHITE: '#F5F5F5',
    LIGHT: '#EFEFEF',
    THEME: '#013138',
  },
  SIZES: {
    ...theme.SIZES,
    BUTTON_HEIGHT: BASE_UNIT * 3.5,
    INPUT_HEIGHT: BASE_UNIT * 3.5,
    BASE: BASE_UNIT,
  },
};
