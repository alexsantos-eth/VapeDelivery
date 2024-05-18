import {useEffect, useState} from 'react';

import database from '@react-native-firebase/database';
import {CommonActions, useNavigation} from '@react-navigation/native';

import {RealtimeCartData} from '../../../models/Cart';
import {getAcceptedOrder} from '@/services/cart';

/**
 * The `useActiveCarts` function in TypeScript manages active carts data by fetching and updating it
 * from a Realtime Database.
 * @returns The `useActiveCarts` custom hook is returning an object with the following properties:
 */
const useActiveCarts = () => {
  const [activeCarts, setActiveCarts] = useState<RealtimeCartData[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const onRefresh = async () => {
    setLoading(true);
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
    setLoading(false);
  };

  useEffect(() => {
    const subscription = navigation.addListener('focus', onRefresh);
    return subscription;
  }, [navigation]);

  return {activeCarts, setActiveCarts, onRefresh, loading} as const;
};

export const useActiveOrder = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const requestOrder = async () => {
      const orderUid = await getAcceptedOrder();
      if (!orderUid) {
        return;
      }

      navigation.dispatch(
        CommonActions.navigate({
          name: 'Order',
          params: {uid: orderUid},
        }),
      );
    };

    requestOrder();
  }, [navigation]);
};

export default useActiveCarts;
