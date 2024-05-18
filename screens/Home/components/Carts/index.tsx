import {Button, Text} from 'galio-framework';
import React from 'react';
import {View} from 'react-native';

import {RealtimeCartData} from '@/models/Cart';

import {useReserveOrder} from './hooks';

interface CartsProps {
  carts: RealtimeCartData[];
}
const Carts: React.FC<CartsProps> = ({carts}) => {
  const onAccept = useReserveOrder();

  return (
    <>
      {carts.map(cart => (
        <View key={cart.id}>
          <View>
            <Text>{cart.direccion_entrega.nombre}</Text>
            <Text>{new Date().toLocaleTimeString()}</Text>
          </View>

          <Button
            width={125}
            fontFamily="$body"
            color="white"
            fontWeight="bold"
            borderRadius="$10"
            onPress={onAccept({order: cart})}
            backgroundColor="$alienGreen">
            Aceptar
          </Button>
        </View>
      ))}
    </>
  );
};

export default Carts;
