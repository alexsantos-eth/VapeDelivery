import {Button, Input, Text} from 'galio-framework';
import React, {useState} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Linking,
  SafeAreaView,
  ScrollView,
  View,
} from 'react-native';

import useBgTracking from '@/hooks/tracking';
import Layout from '@/layout';
import {useNavigation} from '@react-navigation/native';

import {openWaze, updateOrder} from './events';
import {useOrderFromParams, useUserCart} from './hooks';

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

  const updateOrderHandler = (status: number) =>
    updateOrder({setCurrentStep, status, orderRealtime});

  return (
    <>
      <SafeAreaView />

      <Layout>
        <KeyboardAvoidingView behavior="padding">
          <ScrollView>
            <View>
              <View>
                <Text>{orderRealtime?.direccion_entrega.nombre}</Text>
                <Text>{order?.address.name}</Text>
              </View>

              <View>
                <Button
                  onPress={() => Linking.openURL(`tel:${user?.phoneNumber}`)}
                />

                <View>
                  <Text>{user?.displayName}</Text>
                  <Text>{user?.phoneNumber}</Text>
                </View>
              </View>

              <Button onPress={openWazeHandler}>Abrir con Waze</Button>

              {orderRealtime?.detalle.map((product, index) => (
                <View key={index}>
                  <Image
                    source={{uri: product.img[0]}}
                    height={100}
                    width={100}
                  />

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
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </Layout>
    </>
  );
};

export default OrderScreen;
