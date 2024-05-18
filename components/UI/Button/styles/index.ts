import {getUnit} from '@/utils';
import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  text: {
    fontFamily: 'Montserrat-Bold',
  },
  button: {
    borderRadius: getUnit(2),
    width: '100%',
    margin: 0,
  },
});
export default style;
