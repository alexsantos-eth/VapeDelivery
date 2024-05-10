import React from 'react';

import {createTamagui, createTokens, TamaguiProvider} from '@tamagui/core';
import {themes, tokens} from '@tamagui/themes';

import {bodyFont, headingFont} from './providers/theme';
import Router from './router';

export const newTokens = createTokens({
  ...tokens,
  color: {
    alienPurple: '#B172FF',
    alienGreen: '#00EC95',
    alienPink: '#F4B4DD',
  },
});

const tamaguiConfig = createTamagui({
  themes,
  tokens: newTokens,

  fonts: {
    heading: headingFont,
    body: bodyFont,
  },
});

type Conf = typeof tamaguiConfig;
declare module '@tamagui/core' {
  interface TamaguiCustomConfig extends Conf {}
}

interface AppProps {}

const App: React.FC<AppProps> = () => {
  return (
    <TamaguiProvider config={tamaguiConfig}>
      <Router />
    </TamaguiProvider>
  );
};

export default App;
