import React from 'react';

//Libs
import { createStackNavigator } from '@react-navigation/stack';

//Pages
import Gallery from '../screens/gallery';
import NFTData from '../screens/NFTData';
import { NFT } from '../types/NFT';

export type RootStackParamList = { 
    GalleryLanding: undefined,
    NFTData: { nft: NFT, walletAddress: string }
}

const Stack = createStackNavigator<RootStackParamList>();


export default () => {
    

    return (
        <Stack.Navigator
            initialRouteName='GalleryLanding'
            screenOptions={{
                headerShown: false
            }}
        >
          <Stack.Screen name="GalleryLanding" component={Gallery} />
          <Stack.Screen name="NFTData" component={NFTData} />
        </Stack.Navigator>
    );
};