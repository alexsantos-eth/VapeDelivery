import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Main from './Main';

const MainStack = createNativeStackNavigator();

interface RouterProps {}
const Router: React.FC<RouterProps> = () => {
  return (
    <NavigationContainer>
      <MainStack.Navigator screenOptions={{headerShown: false}}>
        <MainStack.Screen name="Main" component={Main} />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
