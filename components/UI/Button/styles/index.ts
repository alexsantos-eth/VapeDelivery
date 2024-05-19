import {getUnit} from '@/components/UI/utils';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Montserrat-Bold',
    fontSize: getUnit(2),
  },
  button: {
    borderRadius: getUnit(2),
    margin: 0,
  },
});
export default styles;
