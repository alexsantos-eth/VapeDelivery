import {useEffect, useState} from 'react';

import {useRoute} from '@react-navigation/native';

import {Cart, RealtimeCartData} from '../../../models/Cart';
import {User} from '../../../models/User';
import {getCart, getRealtimeCart} from '../../../services/cart';
import {getUser} from '../../../services/user';

/**
 * The `useOrderFromParams` function retrieves order data based on a provided UID parameter.
 * @returns The `useOrderFromParams` custom hook is returning an object with three properties: `uid`,
 * `order`, and `orderRealtime`. These properties are derived from the state and effects within the
 * hook.
 */
export const useOrderFromParams = () => {
  const route = useRoute();
  const params = route.params as {uid: string};
  const uid = params?.uid;

  const [orderRealtime, setOrderRealtime] = useState<RealtimeCartData | null>(
    null,
  );
  const [order, setOrder] = useState<Cart | null>(null);

  useEffect(() => {
    const pipeLine = async () => {
      if (!uid) {
        return;
      }

      const realtimeData = await getRealtimeCart({uid});

      if (!realtimeData?.id) {
        return;
      }

      const cartData = await getCart({uid, cartId: realtimeData?.id});

      return {realtime: realtimeData, cart: cartData};
    };

    pipeLine().then(data => {
      if (!data) {
        return;
      }

      setOrderRealtime(data.realtime);

      if (!data.cart) {
        return;
      }

      setOrder(data.cart);
    });
  }, [uid]);

  return {uid, order, orderRealtime};
};

/**
 * The `useUserCart` function in TypeScript fetches user data based on a provided UID and returns the
 * user object along with a function to update the user.
 * @returns The `useUserCart` custom hook is being returned. It returns an object with two properties:
 * `user` and `setUser`. The `user` property holds the user data fetched from the `getUser` function,
 * and the `setUser` property is a function used to update the user data.
 */
export const useUserCart = () => {
  const route = useRoute();
  const params = route.params as {uid: string};
  const uid = params?.uid;

  const [user, setUser] = useState<User | undefined>();

  useEffect(() => {
    const userRequest = async () => {
      const currentUser = await getUser({uid});
      return currentUser;
    };

    userRequest().then(setUser);
  }, [uid]);

  return {user, setUser};
};
