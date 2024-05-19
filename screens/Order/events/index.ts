import {Linking} from 'react-native';

import database from '@react-native-firebase/database';

import {RealtimeCartData} from '../../../models/Cart';
import {zeroPad} from '@/tools';

interface OpenWazeProps {
  order: RealtimeCartData | null;
}
/**
 * The function `openWaze` opens the Waze app with the coordinates of a given order's delivery address.
 * @param {OpenWazeProps}  - It looks like the `openWaze` function is designed to open the Waze app
 * with the coordinates of a given order's delivery address. The function constructs a Waze URL using
 * the latitude and longitude of the delivery address and then attempts to open this URL using the
 * `Linking.openURL`
 * @returns The `openWaze` function is returning the result of `Linking.openURL(wazeURL)`, which is
 * responsible for opening the Waze navigation app with the specified coordinates for the delivery
 * address from the provided `order` object.
 */
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
/**
 * The function `updateOrderStatus` updates the status of an order in a Firebase Realtime Database
 * based on the provided status and user ID.
 * @param {UpdateOrderStatusProps}  - The `updateOrderStatus` function takes an object as a parameter
 * with two properties: `status` and `uid`. The `status` property represents the new status of the
 * order, and the `uid` property is the unique identifier of the order. The function updates the status
 * of the order in
 * @returns If the `uid` is falsy (null, undefined, empty string, etc.), the function will return early
 * and not execute the rest of the code. If the `uid` is valid, the function will update the order
 * status in the Firebase Realtime Database under the `/cart//estado` path with the provided
 * `status` value. It will set the `terminado` field
 */
export const updateOrderStatus = async ({
  status,
  uid,
}: UpdateOrderStatusProps) => {
  if (!uid) {
    return;
  }

  const ref = database()
    .ref(`/cart/${uid}/estado`)
    .child((status - 1).toString());
  const now = new Date();

  return ref.update({
    terminado: true,
    hora: zeroPad(now.getHours(), 2) + ':' + zeroPad(now.getMinutes(), 2),
  });
};

interface UpdateOrderProps {
  status: number;
  setCurrentStep: (status: number) => void;
  orderRealtime: RealtimeCartData | null;
}
/**
 * The `updateOrder` function updates the current step of an order and its status in real-time.
 * @param {UpdateOrderProps}  - The `UpdateOrderProps` object contains the following parameters:
 */
export const updateOrder =
  ({setCurrentStep, status, orderRealtime}: UpdateOrderProps) =>
  () => {
    setCurrentStep(status);
    updateOrderStatus({status, uid: orderRealtime?.uid});
  };
