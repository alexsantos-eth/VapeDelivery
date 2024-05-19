import {StyleSheet} from 'react-native';

import {THEME} from '@/providers/theme/utils';

const styles = StyleSheet.create({
  row: {
    borderBottomWidth: 1,
    borderBottomColor: THEME?.COLORS?.MUTED,
  },
});

export default styles;
