import {useEffect, useState} from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';

import {getUID} from '@/services/auth';
import {DEV} from '@/utils';

export const useLogRedirect = () => {
  const [loaded, setLoaded] = useState(false);
  const [userExists, setUserExists] = useState(false);

  useEffect(() => {
    const requestUID = async () => {
      const userUID = await getUID();
      if (userUID) {
        setUserExists(true);
      }

      setLoaded(true);
    };

    if (DEV) {
      EncryptedStorage.clear();
      setLoaded(true);
    } else {
      requestUID();
    }
  }, []);

  return {loaded, userExists};
};
