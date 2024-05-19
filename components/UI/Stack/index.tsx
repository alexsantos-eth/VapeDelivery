import React from 'react';
import {View, ViewProps} from 'react-native';

/* eslint-disable react-native/no-inline-styles */
import {getLayoutStyles, getUnit} from '@/components/UI/utils';

import {StyledLayoutProps} from '../types';
import styles from './styles';

interface StackProps extends ViewProps, StyledLayoutProps {
  children: React.ReactNode | React.ReactNode[];
  shadow?: boolean;
  gap?: number;
  backGap?: number;
}

const Stack: React.FC<StackProps> = ({
  children,
  direction = 'column',
  shadow = false,
  backGap = 0,
  gap = 1,
  ...props
}) => {
  return (
    <View
      {...props}
      style={[
        getLayoutStyles({direction, ...props}),
        shadow && styles.shadow,
        props.style,
      ]}>
      {Array.isArray(children)
        ? children.map((child, index) => {
            return (
              <View
                style={{
                  width: props.fullWidth ? '100%' : 'auto',
                  marginRight:
                    index < children.length - (1 + backGap) &&
                    direction === 'row'
                      ? getUnit(gap)
                      : 0,
                  marginBottom:
                    index < children.length - (1 + backGap) &&
                    direction === 'column'
                      ? getUnit(gap)
                      : 0,
                }}
                key={index}>
                {child}
              </View>
            );
          })
        : children}
    </View>
  );
};

export default Stack;
