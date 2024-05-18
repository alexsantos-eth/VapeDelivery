import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  image: {
    height: '100%',
    width: '100%',
  },

  overImage: {
    opacity: 0.5,
    position: 'absolute',
    width: 800,
    height: 800,
    right: -350,
    top: -150,
  },

  scroll: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
