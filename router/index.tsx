import React from 'react';

import LoginScreen from '@/screens/Login';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {useLogRedirect} from './hooks';
import Main from './Main';

export const MainStack = createNativeStackNavigator();

interface RouterProps {}
const Router: React.FC<RouterProps> = () => {
  const {loaded, userExists} = useLogRedirect();

  return (
    <>
      {loaded && (
        <MainStack.Navigator screenOptions={{headerShown: false}}>
          {userExists ? (
            <MainStack.Screen name="Main" component={Main} />
          ) : (
            <>
              <MainStack.Screen name="Login" component={LoginScreen} />
              <MainStack.Screen name="Main" component={Main} />
            </>
          )}
        </MainStack.Navigator>
      )}
    </>
  );
};

export default Router;
