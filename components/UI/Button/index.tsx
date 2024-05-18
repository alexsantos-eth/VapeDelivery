import {Button as Btn, ButtonProps} from 'galio-framework';
import React from 'react';

import style from './styles';

interface BtnProps extends ButtonProps {
  children: React.ReactNode;
}
const Button: React.FC<BtnProps> = ({children, ...props}: BtnProps) => {
  return (
    <Btn
      {...props}
      textStyle={[props.textStyle, style.text]}
      style={[props.style, style.button]}>
      {children}
    </Btn>
  );
};

export default Button;
