import React from 'react';

import Button from '@/components/UI/Button';
import Stack from '@/components/UI/Stack';
import Text from '@/components/UI/Text';
import {RealtimeCartData} from '@/models/Cart';

import {useReserveOrder} from './hooks';

interface CartsProps {
  carts: RealtimeCartData[];
}
const Carts: React.FC<CartsProps> = ({carts}) => {
  const onAccept = useReserveOrder();

  return (
    <Stack flex={1}>
      {carts.map(cart => (
        <Stack key={cart.id} background="white" p={3} outline>
          <Stack gap={1} fullWidth>
            <Stack gap={0}>
              <Text bold>{cart.direccion_entrega.nombre}</Text>
              <Text>{`Creado a las: ${new Date().toLocaleTimeString()}`}</Text>
            </Stack>

            <Text bold size={3} color="black">
              Q{cart.total}
            </Text>
          </Stack>

          <Stack direction="row" fullWidth justifyContent="flex-end">
            <Button
              icon="checkmark-circle"
              iconFamily="Ionicon"
              color="theme"
              onPress={onAccept({order: cart})}
              w={110}>
              Aceptar
            </Button>
          </Stack>
        </Stack>
      ))}
    </Stack>
  );
};

export default Carts;
