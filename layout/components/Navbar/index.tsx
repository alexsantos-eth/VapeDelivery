import React from 'react';
import {Image, Text, XStack} from 'tamagui';

interface NavbarProps {}
const Navbar: React.FC<NavbarProps> = () => {
  return (
    <XStack
      gap="$2"
      height={60}
      backgroundColor="$alienPurple"
      paddingHorizontal="$5"
      alignItems="center">
      <Image
        src={require('../../../assets/img/logo_b.png')}
        height={25}
        width={25}
        resizeMode="contain"
      />

      <XStack>
        <Text fontSize="$7" fontFamily="$heading" fontWeight="normal">
          Vape
        </Text>
        <Text fontSize="$7" fontFamily="$heading" fontWeight="bold">
          Escape
        </Text>
      </XStack>
    </XStack>
  );
};

export default Navbar;
