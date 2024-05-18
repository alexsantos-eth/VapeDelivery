/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import {THEME} from '@/providers/theme/utils';

import Stack from '../Stack';
import Text from '../Text';

interface HeadingProps {
  title: string;
  description?: string;
  divider?: boolean;
  margin?: boolean;
}
const Heading: React.FC<HeadingProps> = ({
  title,
  divider,
  description,
  margin,
}) => {
  return (
    <Stack
      gap={0}
      my={margin ? 3 : 0}
      pb={divider ? 3 : 0}
      style={{
        borderBottomWidth: divider ? 1 : 0,
        borderBottomColor: THEME.COLORS?.MUTED,
      }}>
      <Text size={3} bold>
        {title}
      </Text>

      {(description?.length ?? 0) > 0 && <Text>{description}</Text>}
    </Stack>
  );
};

export default Heading;
