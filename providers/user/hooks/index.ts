import {useContext, useEffect, useState} from 'react';

import {UserContext} from '../context';
import {User} from '@/models/User';
import auth from '@react-native-firebase/auth';
import {getUser} from '@/services/user';

export const useUser = () => {
  const userCtx = useContext(UserContext);
  return userCtx;
};

export const useAuthChanged = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(async usr => {
      if (!usr) {
        setUser(null);
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
  }, []);

  return [user, setUser] as const;
};
