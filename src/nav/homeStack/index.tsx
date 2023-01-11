import React from 'react';

//Libs
import { createStackNavigator } from '@react-navigation/stack';

//Pages
import Home from '../../screens/home';
import Landing from '../../screens/landing';

const Stack = createStackNavigator();

export default () => {
    

    return (
        <Stack.Navigator
            initialRouteName='Landing'
            screenOptions={{
                headerShown: false
            }}
        >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Landing" component={Landing} />
        </Stack.Navigator>
    );
};
