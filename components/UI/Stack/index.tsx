/* eslint-disable react-native/no-inline-styles */
import {getUnit} from '@/utils';
import React from 'react';
import {View, ViewProps} from 'react-native';

interface StackProps extends ViewProps {
  children: React.ReactNode | React.ReactNode[];
  direction?: 'row' | 'column';
  fullWidth?: boolean;
  gap?: number;
  mt?: number;
  mb?: number;
  mr?: number;
  ml?: number;
  m?: number;
  mx?: number;
  my?: number;
  p?: number;
  pt?: number;
  pb?: number;
  pl?: number;
  pr?: number;
  px?: number;
  py?: number;
}

const Stack: React.FC<StackProps> = ({
  children,
  direction = 'column',
  fullWidth = true,
  mt = 0,
  mb = 0,
  ml = 0,
  mr = 0,
  m = 0,
  mx = 0,
  my = 0,
  p = 0,
  pt = 0,
  pb = 0,
  pl = 0,
  pr = 0,
  px = 0,
  py = 0,
  gap = 1,
  ...props
}) => {
  return (
    <View
      {...props}
      style={[
        props.style,
        {
          marginTop: getUnit(m || my || mt),
          marginBottom: getUnit(m || my || mb),
          marginLeft: getUnit(m || mx || ml),
          marginRight: getUnit(m || mx || mr),

          paddingTop: getUnit(p || py || pt),
          paddingBottom: getUnit(p || py || pb),
          paddingLeft: getUnit(p || px || pl),
          paddingRight: getUnit(p || px || pr),

          flexDirection: direction,
          width: fullWidth ? '100%' : 'auto',
        },
      ]}>
      {Array.isArray(children)
        ? children.map((child, index) => (
            <View
              style={{
                marginRight:
                  index < children.length - 1 && direction === 'row'
                    ? getUnit(gap)
                    : 0,
                marginBottom:
                  index < children.length - 1 && direction === 'column'
                    ? getUnit(gap)
                    : 0,
              }}
              key={index}>
              {child}
            </View>
          ))
        : children}
    </View>
  );
};

export default Stack;
