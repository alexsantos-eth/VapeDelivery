import {StyleSheet} from 'react-native';

import {getUnit} from '../../components/UI/utils';
import {THEME} from '@/providers/theme/utils';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: getUnit(4),
    backgroundColor: THEME?.COLORS?.LIGHT,
  },
});

export default styles;
