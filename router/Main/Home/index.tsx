import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from '../../../screens/Home';
import OrderScreen from '../../../screens/Order';

const HomeStack = createNativeStackNavigator();

interface HomeStackProps {}
const HomeNavigator: React.FC<HomeStackProps> = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Order" component={OrderScreen} />
    </HomeStack.Navigator>
  );
};

export default HomeNavigator;
