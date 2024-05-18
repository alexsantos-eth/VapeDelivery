import React from 'react';
import {RefreshControl, ScrollView, View} from 'react-native';

import Heading from '@/components/UI/Heading';
import Layout from '@/layout';

import Carts from './components/Carts';
import useActiveCarts from './hooks';
import Empty from './components/Empty';

interface HomeScreenProps {}
const HomeScreen: React.FC<HomeScreenProps> = () => {
  const {activeCarts, onRefresh, loading} = useActiveCarts();

  return (
    <Layout>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={onRefresh} />
        }>
        <Heading
          divider
          margin
          title="Pedidos activos"
          description="Aquí puedes ver los pedidos de hoy."
        />

        {!loading && (
          <View>
            {activeCarts.length === 0 ? (
              <Empty />
            ) : (
              <Carts carts={activeCarts} />
            )}
          </View>
        )}
      </ScrollView>
    </Layout>
  );
};

export default HomeScreen;
