import EncryptedStorage from 'react-native-encrypted-storage';

import {User} from '@/models/User';
import database from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';

import {Cart, RealtimeCartData} from '../../models/Cart';

interface GetCartId {
  uid: string;
  cartId: string;
}
/**
 * The function `getCart` retrieves cart data for a specific user and cart ID from Firestore.
 * @param {GetCartId}  - It looks like the `getCart` function is designed to retrieve cart data for a
 * specific user and cart ID from a Firestore database. The function takes an object as a parameter
 * with properties `uid` and `cartId`, which are used to identify the user and cart respectively.
 * @returns The function `getCart` is returning the data of the cart document fetched from Firestore
 * based on the provided `uid` and `cartId`.
 */

export const getCart = async ({uid, cartId}: GetCartId) => {
  try {
    const usersCollection = firestore().collection('users');
    const userDocument = usersCollection.doc(uid);
    const cartCollection = userDocument.collection('cart');
    const cartDocument = cartCollection.doc(cartId);

    const cartGet = await cartDocument.get();
    const cartData = cartGet.data();

    return cartData as Cart;
  } catch (error) {
    console.log(error);
  }
};

/**
 * The function `getRealtimeCart` retrieves realtime cart data for a specific user ID.
 * @param  - The `getRealtimeCart` function is an asynchronous function that takes an object as a
 * parameter with the `uid` property. It retrieves realtime cart data from the Firebase Realtime
 * Database based on the provided `uid`. If the `uid` is not provided, the function will return
 * `undefined`.
 * @returns The function `getRealtimeCart` is returning an object that contains the data from the
 * `/cart/` location in the database along with the `uid` property.
 */
export const getRealtimeCart = async ({uid}: Omit<GetCartId, 'cartId'>) => {
  try {
    if (!uid) {
      return;
    }

    const ref = database().ref(`/cart/${uid}`);
    const val = await ref.once('value');
    const data = val.val() as RealtimeCartData;

    return {...data, uid};
  } catch (error) {
    console.log(error);
  }
};

interface SaveAcceptedOrderProps {
  order: RealtimeCartData;
  driver: User | null;
}
export const acceptOrder = async ({order, driver}: SaveAcceptedOrderProps) => {
  const ref = database().ref(`/cart/${order.uid}`);

  if (!driver) {
    return;
  }

  if (!order.uid) {
    return;
  }

  // SAVE ON STORAGE
  await EncryptedStorage.setItem('order-id', order.uid);

  await ref.update({
    activo: true,
    motorista: {
      nombre: driver?.displayName,
      telefono: driver?.phoneNumber,
      foto: [
        driver?.picture ||
          'https://firebasestorage.googleapis.com/v0/b/vape-escape-gt.appspot.com/o/public%2F1024.png?alt=media&token=d632d31a-1955-49ea-945f-f868044cde3d',
      ],
    },
  });
};

export const getAcceptedOrder = async () => {
  try {
    const orderId = await EncryptedStorage.getItem('order-id');
    return orderId;
  } catch (error) {
    console.log(error);
  }
};
