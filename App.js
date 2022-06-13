import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import AuthStack from './Navigation/AuthStack';
import AppStack from './Navigation/AppStack';

const App = () => {
  return(
    <NavigationContainer>
      {/*<AppStack/>*/}
      <AuthStack/>
    </NavigationContainer>
  )
}

export default App;