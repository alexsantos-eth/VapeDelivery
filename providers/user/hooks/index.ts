import {useContext, useEffect, useState} from 'react';

import {User} from '@/models/User';
import {getUser} from '@/services/user';
import auth from '@react-native-firebase/auth';
import {CommonActions, useNavigation} from '@react-navigation/native';

import {UserContext} from '../context';

export const useUser = () => {
  const userCtx = useContext(UserContext);
  return userCtx;
};

export const useAuthChanged = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(async usr => {
      if (!usr) {
        setUser(null);
        navigation.dispatch(
          CommonActions.navigate({
            name: 'Login',
          }),
        );
        return;
      }

      const userOnDb = await getUser({uid: usr.uid, isDriver: true});

      if (!userOnDb) {
        setUser(null);
        return;
      }

      setUser(userOnDb);
    });

    return () => unsubscribe();
  }, [navigation]);

  return [user, setUser] as const;
};
