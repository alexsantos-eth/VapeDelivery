import React from 'react';
import {KeyboardAvoidingView} from 'react-native';
import styles from './styles';

interface KeyboardAvoidingProps {
  children: React.ReactNode;
}
const KeyboardAvoiding: React.FC<KeyboardAvoidingProps> = ({children}) => {
  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      {children}
    </KeyboardAvoidingView>
  );
};

export default KeyboardAvoiding;
