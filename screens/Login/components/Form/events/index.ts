import React from 'react';

import {saveUID, signingWithEmail} from '@/services/auth';
import {toast, ToastPosition} from '@backpackapp-io/react-native-toast';
import {useNavigation} from '@react-navigation/native';

interface UseSigningInProps {
  username: string;
  setLoginLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
const useSigningIn = ({setLoginLoading, username}: UseSigningInProps) => {
  const navigation = useNavigation();

  const handler = async () => {
    setLoginLoading(true);

    // VALIDATIONS
    if (!username) {
      toast.error('Nombre de usuario invalido');
      setLoginLoading(false);
      return;
    }

    const userCredential = await signingWithEmail({username});

    if (!userCredential) {
      toast.error('Usuario no encontrado');
      setLoginLoading(false);
      return;
    }

    await saveUID({uid: userCredential.user.uid});

    // SUCCESS
    toast.success('¡Bienvenido!', {position: ToastPosition.BOTTOM});
    setLoginLoading(false);

    // @ts-ignore
    navigation.navigate('Main');
  };

  return handler;
};

export default useSigningIn;
