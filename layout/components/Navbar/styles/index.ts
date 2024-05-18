import {StyleSheet} from 'react-native';

import {getUnit} from '@/utils';

const style = StyleSheet.create({
  container: {
    paddingVertical: getUnit(2),
    paddingHorizontal: getUnit(4),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  image: {
    width: '100%',
    height: '100%',
  },

  imageContainer: {
    height: 20,
    width: 20,
    marginRight: getUnit(1),
  },
});

export default style;
