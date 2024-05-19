import {getUnit} from '@/components/UI/utils';
import {THEME} from '@/providers/theme/utils';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
  imageContainer: {
    width: 100,
    height: 100,
    overflow: 'hidden',
    borderRadius: getUnit(2),
  },

  scrollContainer: {
    height: '100%',
  },

  row: {
    borderBottomWidth: 1,
    borderBottomColor: THEME?.COLORS?.MUTED,
  },
});

export default styles;
