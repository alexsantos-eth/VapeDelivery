import {useEffect, useState} from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';

import {User} from '@/models/User';
import {useUser} from '@/providers/user/hooks';
import {updateUser} from '@/services/user';
import auth from '@react-native-firebase/auth';
import {CommonActions, useNavigation} from '@react-navigation/native';

export const useLogout = () => {
  const navigation = useNavigation();

  const handler = async () => {
    await auth().signOut();
    await EncryptedStorage.clear();

    navigation.dispatch(
      CommonActions.navigate({
        name: 'Login',
      }),
    );
  };

  return handler;
};

interface UseSaveUserProps {
  user: Partial<User>;
}
export const useSaveUser = ({user}: UseSaveUserProps) => {
  const [loading, setLoading] = useState(false);

  const handler = async () => {
    setLoading(true);
    await updateUser({user, uid: auth().currentUser?.uid, isDriver: true});
    setLoading(false);
  };

  return {loading, handler} as const;
};

export const useAccountUser = () => {
  const {user} = useUser();

  // STATES FOR INPUTS
  const [displayName, setDisplayName] = useState(user?.displayName);

  // EFFECT TRIGGERS
  const prevDisplayName = user?.displayName;

  useEffect(() => {
    setDisplayName(prevDisplayName);
  }, [prevDisplayName]);

  return {
    user,
    displayName,
    setDisplayName,
  };
};
