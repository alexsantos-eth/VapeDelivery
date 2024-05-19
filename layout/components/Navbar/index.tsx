import React from 'react';
import {Image, View} from 'react-native';

import Stack from '@/components/UI/Stack';
import Text from '@/components/UI/Text';

import style from './styles';

interface NavbarProps {}
const Navbar: React.FC<NavbarProps> = () => {
  return (
    <Stack
      py={2}
      px={4}
      direction="row"
      alignItems="center"
      justifyContent="flex-start"
      style={style.container}>
      <View style={style.imageContainer}>
        <Image
          source={require('@/assets/img/logo_b.png')}
          resizeMode="contain"
          style={style.image}
        />
      </View>

      <Stack gap={0} direction="row">
        <Text color="white" size={2} bold>
          Vape
        </Text>
        <Text color="white" size={2} bold>
          Escape
        </Text>

        <Text color="white" size={2}>
          {' | Drivers'}
        </Text>
      </Stack>
    </Stack>
  );
};

export default Navbar;
