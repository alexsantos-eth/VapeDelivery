import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View, useTheme} from 'tamagui';

import Navbar from './components/Navbar';
import style from './styles';

interface LayoutProps {
  children: React.ReactNode;
}
const Layout: React.FC<LayoutProps> = ({children}) => {
  const theme = useTheme();

  return (
    <>
      <SafeAreaView
        edges={['top']}
        style={{backgroundColor: theme.alienPurple.get()}}>
        <Navbar />
      </SafeAreaView>

      <SafeAreaView edges={['left', 'right']} style={style.container}>
        <View flex={1} padding="$5">
          {children}
        </View>
      </SafeAreaView>
    </>
  );
};

export default Layout;
