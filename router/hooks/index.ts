import {useEffect, useState} from 'react';

import {getUID} from '@/services/auth';

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

    requestUID();
  }, []);

  return {loaded, userExists};
};
