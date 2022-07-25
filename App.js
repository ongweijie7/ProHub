import React, { useState, useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './Navigation/AuthStack';
import { AppState } from 'react-native';
import { freezeTimer } from './screens/FocusTimer';

const App = () => {
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        console.log("App has come to the foreground!");
      } else if (nextAppState === "inactive" || nextAppState === "background") {
        freezeTimer();
      }

      appState.current = nextAppState;
      // setAppStateVisible(appState.current);
      console.log("AppState", appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return(
    <NavigationContainer>
      {/*<AppStack/>*/}
      <AuthStack/>
    </NavigationContainer>
  )
}

export default App;