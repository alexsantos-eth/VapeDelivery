import {Block} from 'galio-framework';
import React, {useState} from 'react';
import {Image, KeyboardAvoidingView, View} from 'react-native';

import Button from '@/components/UI/Button';
import Input from '@/components/UI/Input';
import Stack from '@/components/UI/Stack';

import useSigningIn from './events';
import styles from './styles';

interface FormProps {}
const Form: React.FC<FormProps> = () => {
  const [username, setUsername] = useState<string>('');
  const [loginLoading, setLoginLoading] = React.useState<boolean>(false);

  const signingEvent = useSigningIn({setLoginLoading, username});

  return (
    <>
      <KeyboardAvoidingView enabled behavior="height" style={styles.scroll}>
        <View style={styles.overImage}>
          <Image
            source={require('../../../../assets/img/login_over.png')}
            resizeMode="contain"
            style={styles.image}
          />
        </View>

        <Block height={90} width={182} center>
          <Image
            source={require('../../../../assets/img/logo_x.png')}
            resizeMode="contain"
            style={styles.image}
          />
        </Block>

        <Stack fullWidth>
          <Input
            family="Ionicon"
            icon="at-outline"
            onChangeText={setUsername}
            placeholder="Nombre de usuario"
          />

          <Button
            color="theme"
            icon="log-in"
            iconFamily="ionicon"
            onPress={signingEvent}
            loading={loginLoading}>
            Iniciar Sesión
          </Button>
        </Stack>
      </KeyboardAvoidingView>
    </>
  );
};

export default Form;
