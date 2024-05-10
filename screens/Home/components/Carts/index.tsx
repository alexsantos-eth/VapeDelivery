import React from 'react';
import {Button, H2, Paragraph, XStack, YStack} from 'tamagui';

import {CheckCircle2} from '@tamagui/lucide-icons';

import useActiveCarts from '../../hooks';
import {useReserveOrder} from './hooks';

const CTAIcon = () => <CheckCircle2 />;
interface CartsProps {}
const Carts: React.FC<CartsProps> = () => {
  const {activeCarts} = useActiveCarts();
  const onAccept = useReserveOrder();

  return (
    <>
      {activeCarts.map(cart => (
        <XStack
          gap="$3"
          marginBottom="$3"
          key={cart.id}
          alignItems="flex-end"
          backgroundColor="white"
          borderRadius="$5"
          justifyContent="space-between"
          padding="$5">
          <YStack width="55%" marginBottom="$5">
            <H2 fontSize="$7" color="$gray8" lineHeight="$5">
              {cart.direccion_entrega.nombre}
            </H2>
            <Paragraph color="$gray8">
              {new Date().toLocaleTimeString()}
            </Paragraph>
          </YStack>

          <Button
            width={125}
            fontFamily="$body"
            color="white"
            icon={CTAIcon}
            fontWeight="bold"
            borderRadius="$10"
            onPress={onAccept({order: cart})}
            backgroundColor="$alienGreen">
            Aceptar
          </Button>
        </XStack>
      ))}
    </>
  );
};

export default Carts;
