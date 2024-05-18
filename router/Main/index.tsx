import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import HomeScreen from '../../screens/Home';
import HomeNavigator from './Home';
import {Icon} from 'galio-framework';
import {THEME} from '@/providers/theme/utils';

interface MainProps {}

const Tab = createBottomTabNavigator();

const PlanetIcon = ({focused}: {focused: boolean}) => {
  return (
    <Icon
      name="home-outline"
      family="Ionicon"
      size={24}
      color={focused ? THEME.COLORS?.PRIMARY : 'gray'}
    />
  );
};

const UserIcon = ({focused}: {focused: boolean}) => {
  return (
    <Icon
      name="person-outline"
      family="Ionicon"
      size={24}
      color={focused ? THEME.COLORS?.PRIMARY : THEME.COLORS?.BLACK}
    />
  );
};

const Main: React.FC<MainProps> = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarInactiveTintColor: THEME.COLORS?.BLACK,
      }}>
      <Tab.Screen
        name="HomeStack"
        component={HomeNavigator}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: PlanetIcon,
        }}
      />

      <Tab.Screen
        name="ProfileStack"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: UserIcon,
        }}
      />
    </Tab.Navigator>
  );
};

export default Main;
