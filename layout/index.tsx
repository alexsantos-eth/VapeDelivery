import {Block} from 'galio-framework';
import React from 'react';
import {SafeAreaView, SafeAreaViewProps} from 'react-native-safe-area-context';

import Navbar from './components/Navbar';
import style from './styles';
import {THEME} from '@/providers/theme/utils';

interface LayoutProps {
  children: React.ReactNode;
  statusCarColor?: string;
  boxStyle?: SafeAreaViewProps['style'];
  hideNavbar?: boolean;
}
const Layout: React.FC<LayoutProps> = ({
  children,
  statusCarColor,
  hideNavbar,
  boxStyle,
}) => {
  return (
    <>
      <SafeAreaView
        edges={['top']}
        style={{backgroundColor: statusCarColor ?? THEME.COLORS?.PRIMARY}}>
        {!hideNavbar && <Navbar />}
      </SafeAreaView>

      <SafeAreaView
        edges={['left', 'right']}
        style={[style.container, boxStyle]}>
        <Block flex={1} fluid>
          {children}
        </Block>
      </SafeAreaView>
    </>
  );
};

export default Layout;
