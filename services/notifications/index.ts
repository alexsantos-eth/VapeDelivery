import firestore from '@react-native-firebase/firestore';

interface DeleteCurrentOrderNotificationProps {
  uid?: string;
}

export const deleteCurrentOrderNotification = ({
  uid,
}: DeleteCurrentOrderNotificationProps) => {
  try {
    const usersCollection = firestore().collection('users');
    const userDocument = usersCollection.doc(uid);
    const notifyCollection = userDocument.collection('notifications');
    const currentOrderDoc = notifyCollection.doc('currentOrder');

    return currentOrderDoc.delete();
  } catch (err) {
    console.log(err);
  }
};
