import {CommonActions, useNavigation} from '@react-navigation/native';

import {RealtimeCartData} from '../../../../../models/Cart';
import database from '@react-native-firebase/database';

interface ReserveOrderProps {
  order: RealtimeCartData;
}

export const useReserveOrder = () => {
  const navigation = useNavigation();

  const handler =
    ({order}: ReserveOrderProps) =>
    async () => {
      const ref = database().ref(`/cart/${order.uid}`);
      await ref.update({
        activo: true,
        motorista: {
          nombre: 'Alex Santos',
          telefono: '35678555',
          foto: [
            'https://firebasestorage.googleapis.com/v0/b/vape-escape-gt.appspot.com/o/public%2F1024.png?alt=media&token=d632d31a-1955-49ea-945f-f868044cde3d',
          ],
        },
      });

      navigation.dispatch(
        CommonActions.navigate({
          name: 'Order',
          params: {uid: order.uid},
        }),
      );
    };

  return handler;
};
