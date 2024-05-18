import {useUser} from '@/providers/user/hooks';
import {acceptOrder} from '@/services/cart';
import {CommonActions, useNavigation} from '@react-navigation/native';

import {RealtimeCartData} from '../../../../../models/Cart';

interface ReserveOrderProps {
  order: RealtimeCartData;
}

/**
 * The useReserveOrder function updates a cart item to set it as active and navigates to the Order
 * screen with the specified order UID.
 * @returns A function handler that updates a specific order in the database to set it as active and
 * assigns a driver to it, then navigates to the 'Order' screen with the order's unique identifier as a
 * parameter.
 */
export const useReserveOrder = () => {
  const navigation = useNavigation();
  const {user} = useUser();

  const handler =
    ({order}: ReserveOrderProps) =>
    async () => {
      await acceptOrder({order, driver: user});

      navigation.dispatch(
        CommonActions.navigate({
          name: 'Order',
          params: {uid: order.uid},
        }),
      );
    };

  return handler;
};
