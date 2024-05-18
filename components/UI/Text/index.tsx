/* eslint-disable react-native/no-inline-styles */
import {THEME} from '@/providers/theme/utils';
import {Text as Txt, TextProps} from 'galio-framework';
import React from 'react';

interface TxtProps extends TextProps {
  center?: boolean;
}
const Text: React.FC<TxtProps> = ({center, ...props}) => {
  return (
    <Txt
      {...props}
      style={[
        {
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
