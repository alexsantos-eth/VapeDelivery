import React from 'react';
import {H2, Paragraph, ScrollView, View, YStack} from 'tamagui';

import Layout from '../../layout';
import Carts from './components/Carts';

interface HomeScreenProps {}
const HomeScreen: React.FC<HomeScreenProps> = () => {
  return (
    <Layout>
      <View flex={1} backgroundColor="$color13">
        <ScrollView flex={1}>
          <YStack marginBottom="$5">
            <H2 theme="light">Pedidos activos</H2>
            <Paragraph theme="light">
              Aquí puedes aceptar los pedidos de hoy.
            </Paragraph>
          </YStack>

          <Carts />
        </ScrollView>
      </View>
    </Layout>
  );
};

export default HomeScreen;
