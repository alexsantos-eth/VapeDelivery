import React, {useState} from 'react';
import Video from 'react-native-video';

import Layout from '@/layout';

import Form from './components/Form';
import styles from './styles';

interface LoginScreenProps {}
const LoginScreen: React.FC<LoginScreenProps> = () => {
  const [videoEnded, setVideoEnded] = useState(false);
  const [videoLoad, setVideoLoad] = useState(false);

  const onVideoLoad = () => setVideoLoad(true);
  const onVideoEnd = () => setVideoEnded(true);

  return (
    <>
      <Layout hideNavbar boxStyle={styles.background}>
        {videoLoad && <Form />}
      </Layout>
      {!videoEnded && (
        <Video
          muted={true}
          repeat={false}
          onEnd={onVideoEnd}
          onLoad={onVideoLoad}
          resizeMode="cover"
          style={styles.backgroundVideo}
          source={require('../../assets/img/splash.mp4')}
        />
      )}
    </>
  );
};

export default LoginScreen;
