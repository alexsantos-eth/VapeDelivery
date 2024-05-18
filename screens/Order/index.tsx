import React, {useState} from 'react';
import {Image, Linking, ScrollView, View} from 'react-native';

import KeyboardAvoiding from '@/components/KeyboardAvoiding';
import Button from '@/components/UI/Button';
import Heading from '@/components/UI/Heading';
import Input from '@/components/UI/Input';
import Text from '@/components/UI/Text';
import useBlockGoBack from '@/hooks/navigation';
import useBgTracking from '@/hooks/tracking';
import Layout from '@/layout';
import {useNavigation} from '@react-navigation/native';

import {openWaze, updateOrder} from './events';
import {useOrderFromParams, useUserCart} from './hooks';
import Stack from '@/components/UI/Stack';

interface OrderScreenProps {}
const OrderScreen: React.FC<OrderScreenProps> = () => {
  // HOOKS
  const {orderRealtime, order} = useOrderFromParams();
  const [currentStep, setCurrentStep] = useState(0);

  const navigation = useNavigation();

  const {user} = useUserCart();
  useBgTracking({uid: orderRealtime?.uid});

  // METHODS
  const openWazeHandler = () => openWaze({order: orderRealtime});

  const openClientNumber = () => Linking.openURL(`tel:${user?.phoneNumber}`);

  const updateOrderHandler = (status: number) =>
    updateOrder({setCurrentStep, status, orderRealtime});

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
            <Stack fullWidth>
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

            <View>
              <Text>{user?.displayName}</Text>
              <Text>{user?.phoneNumber}</Text>
            </View>
          </Stack>

          {orderRealtime?.detalle.map((product, index) => (
            <View key={index}>
              <Image source={{uri: product.img[0]}} height={100} width={100} />

              <View>
                <Text maxWidth={200}>{product.nombre}</Text>
                <Text>Cantidad: {product.cantidad}</Text>
                <Text fontWeight="bold">Q {product.precio}</Text>
              </View>
            </View>
          ))}

          {currentStep === 1 ? (
            <>
              <Input
                textAlign="center"
                fontWeight="bold"
                keyboardType="number-pad"
                maxLength={4}
                placeholder="Código de acceso"
              />
              <Button
                onPress={() => {
                  updateOrderHandler(2)();
                  navigation.goBack();
                }}>
                Finalizar
              </Button>
            </>
          ) : (
            <>
              <Button onPress={updateOrderHandler(0)}>
                Marcar como recibido
              </Button>

              <Button onPress={updateOrderHandler(1)}>En camino</Button>
            </>
          )}
        </ScrollView>
      </KeyboardAvoiding>
    </Layout>
  );
};

export default OrderScreen;
