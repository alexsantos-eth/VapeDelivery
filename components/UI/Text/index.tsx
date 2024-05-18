/* eslint-disable react-native/no-inline-styles */
import {THEME} from '@/providers/theme/utils';
import {Text as Txt, TextProps} from 'galio-framework';
import React from 'react';
import {getUnit} from '../utils';

interface TxtProps extends TextProps {
  center?: boolean;
}
const Text: React.FC<TxtProps> = ({center, size = 2, ...props}) => {
  return (
    <Txt
      {...props}
      style={[
        {
          fontSize: getUnit(size || 2),
          textAlign: center ? 'center' : 'left',
          color: THEME.COLORS?.[props.color?.toUpperCase() ?? 'BLACK'],
          fontFamily: `Montserrat-${props.bold ? 'Bold' : 'Regular'}`,
        },
        props.style,
      ]}
    />
  );
};

export default Text;
