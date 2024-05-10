import React from 'react';
import {useTheme} from 'tamagui';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Home, User} from '@tamagui/lucide-icons';

import HomeScreen from '../../screens/Home';
import HomeNavigator from './Home';

interface MainProps {}

const HomeIcon = ({color}: {color: string}) => <Home color={color} />;
const UserIcon = ({color}: {color: string}) => <User color={color} />;

const Tab = createBottomTabNavigator();
const Main: React.FC<MainProps> = () => {
  const theme = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarInactiveTintColor: 'gray',
        tabBarActiveTintColor: theme.alienPurple.get(),
      }}>
      <Tab.Screen
        name="HomeStack"
        component={HomeNavigator}
        options={{tabBarIcon: HomeIcon}}
      />

      <Tab.Screen
        name="ProfileStack"
        component={HomeScreen}
        options={{tabBarIcon: UserIcon}}
      />
    </Tab.Navigator>
  );
};

export default Main;
