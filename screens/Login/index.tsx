import {LogIn} from '@tamagui/lucide-icons';
import React from 'react';
import {SafeAreaView} from 'react-native';
import {Button, Image, Input, View, YStack} from 'tamagui';

interface LoginScreenProps {}
const LoginScreen: React.FC<LoginScreenProps> = () => {
  return (
    <View backgroundColor="$alienPurple" flex={1}>
      <SafeAreaView />

      <View
        flex={1}
        marginTop="$-20"
        alignItems="center"
        justifyContent="center">
        <YStack gap="$5">
          <Image
            src={require('../../assets/img/login.png')}
            height={200}
            width={300}
          />

          <YStack gap="$3">
            <Input
              size="$8"
              textAlign="center"
              fontWeight="bold"
              fontFamily="$heading"
              keyboardType="number-pad"
              placeholder="Código de acceso"
            />
            <Button backgroundColor="$alienGreen" color="$gray5" icon={LogIn}>
              Ingresar
            </Button>
          </YStack>
        </YStack>
      </View>

      <SafeAreaView />
    </View>
  );
};

export default LoginScreen;
