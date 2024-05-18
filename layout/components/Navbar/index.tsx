import {Block} from 'galio-framework';
import React from 'react';
import {Image, View} from 'react-native';

import Text from '@/components/UI/Text';

import style from './styles';
import {getUnit} from '@/utils';

interface NavbarProps {}
const Navbar: React.FC<NavbarProps> = () => {
  return (
    <View style={style.container}>
      <View style={style.imageContainer}>
        <Image
          source={require('@/assets/img/logo_b.png')}
          resizeMode="contain"
          style={style.image}
        />
      </View>

      <Block row>
        <Text color="white" size={getUnit(2)} bold>
          Vape
        </Text>
        <Text color="white" size={getUnit(2)} bold>
          Escape
        </Text>

        <Text color="white" size={getUnit(2)}>
          {' | Drivers'}
        </Text>
      </Block>
    </View>
  );
};

export default Navbar;
