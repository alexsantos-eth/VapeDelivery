import {StyleSheet} from 'react-native';
import {THEME} from '../../../providers/theme/utils';

const styles = StyleSheet.create({
  background: {
    backgroundColor: THEME.COLORS?.PRIMARY,
  },

  backgroundVideo: {
    position: 'absolute',
    top: -78,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

export default styles;
