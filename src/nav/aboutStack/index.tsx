import React from 'react';

//Libs
import { createStackNavigator } from '@react-navigation/stack';

//Pages
import About from '../../screens/about';

const Stack = createStackNavigator();

export default () => {
    

    return (
        <Stack.Navigator
            initialRouteName='About'
            screenOptions={{
                headerShown: false
            }}
        >
          <Stack.Screen name="About" component={About} />
        </Stack.Navigator>
    );
};
