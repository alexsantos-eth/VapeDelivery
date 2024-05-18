import EncryptedStorage from 'react-native-encrypted-storage';

import auth from '@react-native-firebase/auth';

interface SigningWithEmailProps {
  username: string;
}
/**
 * The function `signingWithEmail` signs in a user using their email address with a default password.
 * @param {SigningWithEmailProps}  - It looks like the `signingWithEmail` function is designed to sign
 * in a user with their email using Firebase authentication. The function takes an object as a
 * parameter with a `username` property. The `username` is used to construct the email address for
 * signing in.
 * @returns The function `signingWithEmail` is returning the result of the
 * `auth().signInWithEmailAndPassword` function call, which is the result of signing in with the
 * provided email and password.
 */
export const signingWithEmail = async ({username}: SigningWithEmailProps) => {
  try {
    if (!username) {
      throw new Error('Nombre de usuario invalido');
    }

    const emailSigning = await auth().signInWithEmailAndPassword(
      `${username}@vapeescape.com`,
      'vapeescape',
    );

    return emailSigning;
  } catch (error) {
    console.log(error);
  }
};

interface SaveUIDProps {
  uid: string;
}

/**
 * The function `saveUID` saves a user ID (uid) securely using EncryptedStorage in TypeScript.
 * @param {SaveUIDProps}  - The `saveUID` function is an asynchronous function that takes an object as
 * a parameter with a property `uid`. Inside the function, it attempts to save the `uid` using
 * `EncryptedStorage.setItem('uid', uid)`. If an error occurs during the saving process, it will be
 * caught
 */
export const saveUID = async ({uid}: SaveUIDProps) => {
  try {
    await EncryptedStorage.setItem('uid', uid);
  } catch (error) {
    console.log(error);
  }
};

/**
 * The function `getUID` retrieves an encrypted UID from storage asynchronously in TypeScript.
 * @returns The `getUID` function is returning the UID (user identifier) fetched from EncryptedStorage.
 */
export const getUID = async () => {
  try {
    const uid = await EncryptedStorage.getItem('uid');
    return uid;
  } catch (error) {
    console.log(error);
  }
};
