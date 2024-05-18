/* eslint-disable quotes */
import React from 'react';
import {Image, View} from 'react-native';

import Stack from '@/components/UI/Stack';

import styles from './styles';
import Text from '@/components/UI/Text';

interface EmptyProps {}
const Empty: React.FC<EmptyProps> = () => {
  return (
    <Stack style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require('@/assets/img/empty.png')}
          style={styles.image}
        />
      </View>

      <Text center>
        {` No hay pedidos en tu galaxia.\n¡Pronto habrá más exploraciones cósmicas!`}
      </Text>
    </Stack>
  );
};

export default Empty;
