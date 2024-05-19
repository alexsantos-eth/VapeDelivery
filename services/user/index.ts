import firestore from '@react-native-firebase/firestore';

import {User} from '../../models/User';

interface GetUserProps {
  uid: string;
  isDriver?: boolean;
}
/**
 * The function `getUser` retrieves user data from a Firestore collection based on the provided user
 * ID.
 * @param {GetUserProps}  - The `getUser` function is an asynchronous function that takes an object as
 * a parameter with a property `uid`. It then tries to fetch a user document from a Firestore
 * collection named 'users' using the provided `uid`. If successful, it returns the user data as a
 * `User` object. If
 * @returns The `getUser` function is returning the data of the user with the specified `uid` from the
 * Firestore database as a `User` object. If there is an error during the process, it will be caught
 * and logged to the console.
 */
export const getUser = async ({uid, isDriver}: GetUserProps) => {
  try {
    const user = await firestore()
      .collection(isDriver ? 'drivers' : 'users')
      .doc(uid)
      .get();
    return user.data() as User;
  } catch (error) {
    console.log('Error getting user', error);
  }
};
