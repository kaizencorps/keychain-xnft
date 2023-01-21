import React from 'react';

//Libs
import { createStackNavigator } from '@react-navigation/stack';

//Pages
import Test from "../screens/test";

export type RootStackParamList = {
  TestScreen: undefined
}

const Stack = createStackNavigator<RootStackParamList>();

export default () => {


  return (
      <Stack.Navigator
          initialRouteName='TestScreen'
          screenOptions={{
            headerShown: false
          }}
      >
        <Stack.Screen name="TestScreen" component={Test} />
      </Stack.Navigator>
  );
};
