import {NavigationContainer} from '@react-navigation/native';
import React, {createContext, useEffect, useState} from 'react';
import {Platform, SafeAreaView, UIManager} from 'react-native';
import {Auth, UpdateProfile} from './src/screens';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import startServer from './src/mockData';
import dayjs from 'dayjs';

var customParseFormat = require('dayjs/plugin/customParseFormat');
dayjs.extend(customParseFormat);
if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const Stack = createNativeStackNavigator();
export const mainContext = createContext<{
  state: {};
  setState: React.Dispatch<React.SetStateAction<{}>>;
}>({state: {}, setState: () => {}});

function App(): React.JSX.Element {
  useEffect(() => {
    startServer;
  });
  const [state, setState] = useState({});
  return (
    <mainContext.Provider value={{state, setState}}>
      <NavigationContainer>
        <SafeAreaView style={{flex: 1}}>
          <Stack.Navigator>
            {state?.token ? (
              <Stack.Screen
                name="UpdateProfile"
                component={UpdateProfile}
                options={{headerShown: false}}
              />
            ) : (
              <Stack.Screen
                name="Auth"
                component={Auth}
                options={{headerShown: false}}
              />
            )}
          </Stack.Navigator>
        </SafeAreaView>
      </NavigationContainer>
    </mainContext.Provider>
  );
}

export default App;
