import React from 'react';

//Libs
import { createStackNavigator } from '@react-navigation/stack';

//Pages
import Gallery from '../../screens/gallery';
import KaizenData from '../../screens/kaizen-data';

const Stack = createStackNavigator();

export default () => {
    

    return (
        <Stack.Navigator
            initialRouteName='Gallery'
            screenOptions={{
                headerShown: false
            }}
        >
          <Stack.Screen name="Gallery" component={Gallery} />
          <Stack.Screen name="KaizenData" component={KaizenData} />
        </Stack.Navigator>
    );
};