import {GalioProviderProps, theme} from 'galio-framework';

export const THEME: GalioProviderProps['theme'] = {
  ...theme,
  COLORS: {
    ...theme.COLORS,
    BLACK: '#444',
    PRIMARY: '#B172FF',
    WHITE: '#F5F5F5',
    THEME: '#00EC95',
  },
  SIZES: {
    ...theme.SIZES,
    BUTTON_HEIGHT: 50,
    INPUT_HEIGHT: 50,
    BASE: 16,
  },
};
