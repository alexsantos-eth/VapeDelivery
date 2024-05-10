import {useEffect, useState} from 'react';

import database from '@react-native-firebase/database';
import {useNavigation} from '@react-navigation/native';

import {RealtimeCartData} from '../../../models/Cart';

const useActiveCarts = () => {
  const [activeCarts, setActiveCarts] = useState<RealtimeCartData[]>([]);
  const navigation = useNavigation();

  const onRefresh = async () => {
    const ref = database().ref('cart');
    const snapshot = await ref.once('value');

    const data = snapshot.val();
    if (!data) {
      return;
    }

    const dbActiveCarts = Object.entries(data)
      .filter(([_, cart]) => (cart as RealtimeCartData).activo === false)
      .map(([uid, cart]) => ({
        uid,
        ...(cart as RealtimeCartData),
      })) as RealtimeCartData[];

    setActiveCarts(dbActiveCarts);
  };

  useEffect(() => {
    const subscription = navigation.addListener('focus', onRefresh);
    return subscription;
  }, [navigation]);

  return {activeCarts, setActiveCarts, onRefresh} as const;
};

export default useActiveCarts;
