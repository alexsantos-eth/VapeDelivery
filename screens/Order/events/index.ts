import {Linking} from 'react-native';

import {RealtimeCartData} from '../../../models/Cart';
import database from '@react-native-firebase/database';

interface OpenWazeProps {
  order: RealtimeCartData | null;
}
export const openWaze = ({order}: OpenWazeProps) => {
  if (!order) {
    return;
  }

  const wazeURL = `https://www.waze.com/ul?ll=${order?.direccion_entrega.latitud}%2C${order?.direccion_entrega.longitud}&navigate=yes&zoom=17`;

  // LINKING OPEN
  return Linking.openURL(wazeURL);
};

interface UpdateOrderStatusProps {
  status: number;
  uid?: string;
}
export const updateOrderStatus = ({status, uid}: UpdateOrderStatusProps) => {
  if (!uid) {
    return;
  }

  const ref = database().ref(`/cart/${uid}/estado`).child(status.toString());

  ref.update({
    terminado: true,
    hora: new Date().getHours() + ':' + new Date().getMinutes(),
  });
};
