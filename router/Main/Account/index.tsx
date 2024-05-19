import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import AccountScreen from '../../../screens/Account';

const AccountStack = createNativeStackNavigator();

interface AccountStackProps {}
const AccountNavigator: React.FC<AccountStackProps> = () => {
  return (
    <AccountStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <AccountStack.Screen name="Account" component={AccountScreen} />
    </AccountStack.Navigator>
  );
};

export default AccountNavigator;
