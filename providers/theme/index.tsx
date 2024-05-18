import {GalioProvider} from 'galio-framework';
import React from 'react';
import {THEME} from './utils';

interface ThemeProviderProps {
  children: React.ReactNode;
}
const ThemeProvider: React.FC<ThemeProviderProps> = ({children}) => {
  return <GalioProvider theme={THEME}>{children}</GalioProvider>;
};

export default ThemeProvider;
