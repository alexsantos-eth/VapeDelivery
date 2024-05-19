/* eslint-disable react-native/no-inline-styles */
import {Button as Btn, ButtonProps} from 'galio-framework';
import React from 'react';

import {THEME} from '@/providers/theme/utils';

import {StyledLayoutProps} from '../types';
import {getLayoutStyles} from '../utils';
import styles from './styles';

interface BtnProps extends ButtonProps, StyledLayoutProps {
  children: React.ReactNode;
}

const Button: React.FC<BtnProps> = ({
  children,
  alignItems = 'center',
  justifyContent = 'center',
  ...props
}: BtnProps) => {
  return (
    <Btn
      {...props}
      textStyle={[
        props.textStyle,
        styles.text,
        props.outline && {
          color: THEME?.COLORS?.[props.color?.toUpperCase() || 'THEME'],
        },
      ]}
      iconColor={
        props.outline
          ? THEME?.COLORS?.[props.color?.toUpperCase() || 'THEME']
          : undefined
      }
      style={[
        getLayoutStyles({...props, alignItems, justifyContent}),
        styles.button,
        props.style,
        props.outline && {
          borderWidth: 1,
          shadowColor: 'transparent',
          borderColor: THEME?.COLORS?.[props.color?.toUpperCase() || 'THEME'],
          backgroundColor: 'transparent',
        },
      ]}>
      {children}
    </Btn>
  );
};

export default Button;
