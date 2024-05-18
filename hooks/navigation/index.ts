import {useEffect} from 'react';
import {BackHandler} from 'react-native';

import {useNavigation} from '@react-navigation/native';

const useBlockGoBack = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const backAction = () => {
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [navigation]);
};

export default useBlockGoBack;
