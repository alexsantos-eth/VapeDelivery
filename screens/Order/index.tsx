import React, {useState} from 'react';
import {Image, Linking, ScrollView} from 'react-native';

import KeyboardAvoiding from '@/components/KeyboardAvoiding';
import Button from '@/components/UI/Button';
import Heading from '@/components/UI/Heading';
import Stack from '@/components/UI/Stack';
import Text from '@/components/UI/Text';
import useBlockGoBack from '@/hooks/navigation';
import useBgTracking from '@/hooks/tracking';
import Layout from '@/layout';

import {openWaze, updateOrder} from './events';
import {useDeliverOrder, useOrderFromParams, useUserCart} from './hooks';
import styles from './styles';
import Input from '@/components/UI/Input';

interface OrderScreenProps {}
const OrderScreen: React.FC<OrderScreenProps> = () => {
  const [verificationCode, setVerificationCode] = useState('');

  // HOOKS
  const {orderRealtime, order, currentStep, setCurrentStep} =
    useOrderFromParams();

  const {user} = useUserCart();
  useBgTracking({uid: orderRealtime?.uid});

  // METHODS
  const openWazeHandler = () => openWaze({order: orderRealtime});

  const openClientNumber = () => Linking.openURL(`tel:${user?.phoneNumber}`);

  const updateOrderHandler = (status: number) =>
    updateOrder({setCurrentStep, status, orderRealtime});

  const {handler: deliverOrder, loading: deliverLoading} = useDeliverOrder({
    order,
    verificationCode,
    orderCode: orderRealtime?.codigoVerificacion,
  });

  useBlockGoBack();

  return (
    <Layout>
      <KeyboardAvoiding>
        <ScrollView>
          <Heading
            margin
            title={orderRealtime?.direccion_entrega?.nombre || ''}
            description={order?.address?.name}
          />

          <Stack fullWidth>
            <Stack>
              <Stack direction="row">
                <Text size={2}>Entrega para</Text>
                <Text size={2} bold>
                  {user?.displayName}
                </Text>
              </Stack>
            </Stack>

            <Stack fullWidth gap={2}>
              <Button
                outline
                onPress={openClientNumber}
                fullWidth
                iconFamily="Ionicon"
                color="theme"
                icon="call">
                Llamar al cliente
              </Button>

              <Button
                icon="navigate-circle"
                fullWidth
                iconFamily="Ionicon"
                onPress={openWazeHandler}
                color="theme">
                Abrir con Waze
              </Button>
            </Stack>
          </Stack>

          <Stack my={5}>
            {orderRealtime?.detalle.map((product, index) => (
              <Stack key={index} direction="row" gap={2}>
                <Stack borderRadius={2} style={styles.imageContainer}>
                  <Image source={{uri: product.img[0]}} style={styles.image} />
                </Stack>

                <Stack>
                  <Text maxWidth={200} bold>
                    {product.nombre}
                  </Text>
                  <Text>Cantidad: {product.cantidad}</Text>
                  <Text bold>Q{product.precio}</Text>
                </Stack>
              </Stack>
            ))}
          </Stack>

          {currentStep !== 2 ? (
            <Stack background="white" p={3} gap={3}>
              <Stack
                pb={3}
                direction="row"
                alignItems="center"
                style={styles.row}
                justifyContent="space-between">
                <Stack direction="row" gap={2} alignItems="center">
                  <Text bold size={3}>
                    1.
                  </Text>

                  <Stack gap={0}>
                    <Text bold size={2}>
                      {currentStep > 0
                        ? 'Pedido recolectado'
                        : '¿Ya tienes el pedido?'}
                    </Text>

                    {currentStep > 0 && (
                      <Text>{`${orderRealtime?.estado?.[0]?.hora} hrs`}</Text>
                    )}
                  </Stack>
                </Stack>

                <Button
                  w={70}
                  disabled={currentStep > 0}
                  onPress={updateOrderHandler(1)}
                  color={currentStep > 0 ? 'gray' : 'theme'}
                  iconFamily="Ionicon"
                  icon="checkmark-circle">
                  Si
                </Button>
              </Stack>

              {currentStep >= 1 && (
                <Stack
                  pb={3}
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between">
                  <Stack direction="row" gap={2} alignItems="center">
                    <Text bold size={3}>
                      2.
                    </Text>

                    <Stack gap={0}>
                      <Text bold size={2}>
                        {currentStep > 1
                          ? 'Pedido en camino'
                          : '¿Ya estas en ruta?'}
                      </Text>

                      {currentStep > 1 && (
                        <Text>{`${orderRealtime?.estado?.[1]?.hora} hrs`}</Text>
                      )}
                    </Stack>
                  </Stack>

                  <Button
                    w={70}
                    disabled={currentStep > 1}
                    onPress={updateOrderHandler(2)}
                    color={currentStep > 1 ? 'gray' : 'theme'}
                    iconFamily="Ionicon"
                    icon="checkmark-circle">
                    Si
                  </Button>
                </Stack>
              )}
            </Stack>
          ) : (
            <Input
              type="number-pad"
              family="Ionicon"
              returnKeyType="done"
              onChangeText={setVerificationCode}
              returnKeyLabel="Entregar"
              icon="lock-closed-outline"
              placeholder="Código de verificación"
            />
          )}

          {currentStep === 2 && (
            <Stack
              mt={1}
              direction="row"
              alignItems="center"
              justifyContent="space-between">
              <Button
                fullWidth
                onPress={deliverOrder}
                color="theme"
                loading={deliverLoading}
                iconFamily="Ionicon"
                icon="checkmark-circle">
                Entregado
              </Button>
            </Stack>
          )}
        </ScrollView>
      </KeyboardAvoiding>
    </Layout>
  );
};

export default OrderScreen;
