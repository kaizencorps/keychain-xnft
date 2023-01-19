import React from 'react';

//Libs
import { createStackNavigator } from '@react-navigation/stack';

//Pages
import Gallery from '../screens/gallery';
import NFTData from '../screens/nft-data';

export type RootStackParamList = { 
    Gallery: undefined,
    NFTData: { initialNFTIndex: number, walletAddress: string }
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
          <Stack.Screen name="NFTData" component={NFTData} />
        </Stack.Navigator>
    );
};