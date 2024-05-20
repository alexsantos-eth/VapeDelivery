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

  const deliverEvent = useDeliverOrder({
    order,
    verificationCode,
    orderCode: orderRealtime?.codigoVerificacion,
  });

  useBlockGoBack();

  return (
    <Layout>
      <KeyboardAvoiding>
        <ScrollView style={styles.scrollContainer}>
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

              <Text size={2}>{`Nota: ${orderRealtime?.notaMotorista}`}</Text>
            </Stack>

            <Stack direction="row" alignItems="center" my={2}>
              <Text size={2.5}>Total a cancelar:</Text>
              <Text bold size={2.5}>
                {order?.payMethod === 'efectivo'
                  ? `Q${orderRealtime?.total}`
                  : 'Pagado'}
              </Text>
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

          <Stack
            background="white"
            backGap={2 - currentStep}
            shadow
            gap={3}
            mt={4}
            mb={4}
            p={3}>
            <Stack>
              {orderRealtime?.detalle.map((product, index) => (
                <Stack key={index} direction="row" gap={2}>
                  <Stack borderRadius={2} style={styles.imageContainer}>
                    <Image
                      source={{uri: product.img[0]}}
                      style={styles.image}
                    />
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

            <Stack
              direction="row"
              alignItems="center"
              pb={currentStep > 0 ? 3 : 0}
              style={currentStep > 0 ? styles.row : undefined}
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
                direction="row"
                alignItems="center"
                pb={currentStep > 1 ? 3 : 0}
                style={currentStep > 1 ? styles.row : undefined}
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

            <Stack fullWidth>
              {currentStep === 2 && (
                <>
                  <Stack direction="row" gap={2} alignItems="center" mb={2}>
                    <Text bold size={3}>
                      3.
                    </Text>

                    <Stack gap={0}>
                      <Text bold size={2}>
                        ¿Vas a entregar el pedido?
                      </Text>

                      <Text>Confirma la entrega con el cliente</Text>
                    </Stack>
                  </Stack>

                  <Input
                    type="number-pad"
                    family="Ionicon"
                    returnKeyType="done"
                    onChangeText={setVerificationCode}
                    returnKeyLabel="Entregar"
                    icon="lock-closed"
                    placeholder="Código de verificación"
                  />

                  <Stack
                    mt={1}
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between">
                    <Button
                      onPress={deliverEvent.handler}
                      color="theme"
                      loading={deliverEvent.loading}
                      iconFamily="Ionicon"
                      icon="checkmark-circle">
                      Entregado
                    </Button>
                  </Stack>
                </>
              )}
            </Stack>
          </Stack>
        </ScrollView>
      </KeyboardAvoiding>
    </Layout>
  );
};

export default OrderScreen;
