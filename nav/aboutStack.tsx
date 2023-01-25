import React from 'react';

//Libs
import { createStackNavigator } from '@react-navigation/stack';

//Pages
import About from '../screens/about';
import Socials from '../screens/socials';

export type RootStackParamList = { 
    About: undefined,
    Socials: undefined
}

const Stack = createStackNavigator<RootStackParamList>();

export default () => {
    

    return (
        <Stack.Navigator
            initialRouteName='Socials'
            screenOptions={{
                headerShown: false
            }}
        >
          <Stack.Screen name="About" component={About} />
          <Stack.Screen name="Socials" component={Socials} />
        </Stack.Navigator>
    );
};
