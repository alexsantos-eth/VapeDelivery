import {Input as Inp, InputProps} from 'galio-framework';
import React from 'react';

import {THEME} from '@/providers/theme/utils';
import {getUnit} from '@/components/UI/utils';
import styles from './styles';

interface InpProps extends InputProps {}
const Input: React.FC<InpProps> = ({...props}) => {
  const themeColor = THEME.COLORS?.[props.color?.toUpperCase() ?? 'PRIMARY'];

  return (
    <Inp
      {...props}
      returnKeyType="done"
      returnKeyLabel="Aceptar"
      color={themeColor}
      textInputStyle={[styles.text, props.textInputStyle]}
      style={[
        {
          borderColor: themeColor,
          borderRadius: getUnit(2),
        },
        props.style,
      ]}
      placeholderTextColor={themeColor}
    />
  );
};

export default Input;
