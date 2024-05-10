import {useEffect, useRef, useState} from 'react';
import {AppState} from 'react-native';
import _BackgroundTimer from 'react-native-background-timer';

import Geolocation from '@react-native-community/geolocation';

import {sendLocation} from '../utils/location';

/**
 * The `useBgTracking` function in TypeScript sets up background tracking for geolocation updates based
 * on app state changes.
 * @returns The `useBgTracking` custom hook is returning an object with a single property
 * `setBackgroundListener`. This property is a function that can be used to set the
 * `backgroundListener` state variable in the component where the hook is used.
 */
interface UseBgTrackingProps {
  uid?: string;
}
const useBgTracking = ({uid}: UseBgTrackingProps) => {
  const appState = useRef(AppState.currentState);
  const [backgroundListener, setBackgroundListener] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const syncTimer = () => {
      timer = setInterval(() => {
        Geolocation.getCurrentPosition(
          position => {
            sendLocation({position, uid});
          },
          error =>
            console.log(
              'getCurrentPosition foreground error',
              JSON.stringify(error),
            ),
          {enableHighAccuracy: true},
        );
      }, 1000);
    };

    const subscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState.match(/inactive|background/)) {
        _BackgroundTimer.runBackgroundTimer(() => {
          Geolocation.getCurrentPosition(
            position => {
              sendLocation({position, uid});
            },
            error => console.log(JSON.stringify(error)),
            {enableHighAccuracy: true},
          );
        }, 1000);
      } else {
        _BackgroundTimer.stopBackgroundTimer();
      }

      appState.current = nextAppState;
    });

    syncTimer();

    return () => {
      if (timer) {
        clearInterval(timer);
      }
      subscription.remove();
    };
  }, [backgroundListener, uid]);

  return {backgroundListener, setBackgroundListener};
};

export default useBgTracking;
