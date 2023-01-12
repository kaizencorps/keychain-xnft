import React from 'react';

//Libs
import { createStackNavigator } from '@react-navigation/stack';

//Pages
import Gallery from '../../screens/gallery';
import KaizenData from '../../screens/kaizen-data';

type RootStackParamList = { 
    Gallery: undefined,
    KaizenData: { initialKaizenIndex: number, walletAddress: string }
}

const Stack = createStackNavigator<RootStackParamList>();


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