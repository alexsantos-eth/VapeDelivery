import {GeolocationResponse} from '@react-native-community/geolocation';
import database from '@react-native-firebase/database';

/**
 * The function `sendLocation` updates the latitude and longitude of a motorist's location in a
 * Firebase Realtime Database.
 * @param {GeolocationResponse} location - The `location` parameter is of type `GeolocationResponse`,
 * which likely contains information about the current location of a device, such as latitude and
 * longitude coordinates.
 */
interface SendLocationProps {
  position: GeolocationResponse;
  uid?: string;
}
export const sendLocation = ({position, uid}: SendLocationProps) => {
  try {
    if (!uid) {
      return;
    }

    const reference = database().ref(`/cart/${uid}/ubicacion_motorista`);

    reference.update({
      latitud: position.coords.latitude,
      longitud: position.coords.longitude,
    });
  } catch (error) {
    console.log(error);
  }
};
