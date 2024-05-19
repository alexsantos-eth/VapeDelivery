import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {Toasts} from '@backpackapp-io/react-native-toast';
import {NavigationContainer} from '@react-navigation/native';

import ThemeProvider from './providers/theme';
import UserProvider from './providers/user';
import Router from './router';

interface AppProps {}

const App: React.FC<AppProps> = () => {
  return (
    <NavigationContainer>
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
    </NavigationContainer>
  );
};

export default App;
