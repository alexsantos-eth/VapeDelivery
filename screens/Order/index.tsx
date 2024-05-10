import React, {useState} from 'react';
import {
  Button,
  H2,
  H3,
  H4,
  Image,
  Input,
  Paragraph,
  Portal,
  ScrollView,
  XStack,
  YStack,
  useTheme,
} from 'tamagui';

import {Map, Phone} from '@tamagui/lucide-icons';

import Layout from '../../layout';
import {openWaze, updateOrderStatus} from './events';
import {useOrderFromParams, useUserCart} from './hooks';
import useBgTracking from '../../hooks/bgtracking';
import {KeyboardAvoidingView, Linking, SafeAreaView} from 'react-native';
import {useNavigation} from '@react-navigation/native';

interface OrderScreenProps {}
const OrderScreen: React.FC<OrderScreenProps> = () => {
  // HOOKS
  const {orderRealtime, order} = useOrderFromParams();
  const [currentStep, setCurrentStep] = useState(0);
  const theme = useTheme();

  const navigation = useNavigation();

  const {user} = useUserCart();
  useBgTracking({uid: orderRealtime?.uid});

  // METHODS
  const openWazeHandler = () => openWaze({order: orderRealtime});

  const updateOrderHandler = (status: number) => () => {
    setCurrentStep(status);
    updateOrderStatus({status, uid: orderRealtime?.uid});
  };

  return (
    <Portal flex={1} backgroundColor="white">
      <SafeAreaView style={{backgroundColor: theme.alienPurple.get()}} />

      <Layout>
        <KeyboardAvoidingView behavior="padding">
          <ScrollView>
            <YStack gap="$5" marginBottom={200}>
              <YStack>
                <H2 theme="light">{orderRealtime?.direccion_entrega.nombre}</H2>
                <Paragraph theme="light">{order?.address.name}</Paragraph>
              </YStack>

              <XStack alignItems="center" gap="$4">
                <Button
                  icon={Phone}
                  onPress={() => Linking.openURL(`tel:${user?.phoneNumber}`)}
                  backgroundColor="$alienPurple"
                />

                <YStack>
                  <H3 theme="light">{user?.displayName}</H3>
                  <Paragraph theme="light">{user?.phoneNumber}</Paragraph>
                </YStack>
              </XStack>

              <Button icon={<Map />} onPress={openWazeHandler}>
                Abrir con Waze
              </Button>

              {orderRealtime?.detalle.map((product, index) => (
                <XStack key={index} gap="$3">
                  <Image
                    borderRadius="$10"
                    src={{uri: product.img[0]}}
                    width={100}
                    height={100}
                  />

                  <YStack>
                    <H4
                      maxWidth={200}
                      theme="light"
                      fontSize="$6"
                      lineHeight="$1">
                      {product.nombre}
                    </H4>

                    <Paragraph theme="light">
                      Cantidad: {product.cantidad}
                    </Paragraph>

                    <Paragraph
                      theme="light"
                      fontWeight="bold"
                      fontFamily="$heading">
                      Q {product.precio}
                    </Paragraph>
                  </YStack>
                </XStack>
              ))}

              {currentStep === 1 ? (
                <>
                  <Input
                    size="$4"
                    textAlign="center"
                    fontWeight="bold"
                    fontFamily="$heading"
                    keyboardType="number-pad"
                    placeholder="Código de acceso"
                  />
                  <Button
                    icon={<Map />}
                    backgroundColor="$alienPurple"
                    onPress={() => navigation.goBack()}>
                    Finalizar
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    icon={<Map />}
                    backgroundColor="$alienPurple"
                    onPress={updateOrderHandler(0)}>
                    Marcar como recibido
                  </Button>

                  <Button
                    icon={<Map />}
                    backgroundColor="$alienPurple"
                    onPress={updateOrderHandler(1)}>
                    En camino
                  </Button>
                </>
              )}
            </YStack>
          </ScrollView>
        </KeyboardAvoidingView>
      </Layout>
    </Portal>
  );
};

export default OrderScreen;
