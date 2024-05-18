import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {Toasts} from '@backpackapp-io/react-native-toast';

import ThemeProvider from './providers/theme';
import Router from './router';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import UserProvider from './providers/user';

interface AppProps {}

const App: React.FC<AppProps> = () => {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView>
        <UserProvider>
          <ThemeProvider>
            <Router />
            <Toasts overrideDarkMode={false} />
          </ThemeProvider>
        </UserProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};

export default App;
