import React from 'react';

//Libs
import { createStackNavigator } from '@react-navigation/stack';

//Pages
import Home from '../../screens/home';
import Landing from '../../screens/landing';
import AddNewWallet from '../../screens/addNewWallet';
import VerifyWalletDetails from '../../screens/verifyWalletDetails';
import WalletDetails from '../../screens/walletDetails';

//Types
import { Wallet } from '../../types/wallet';

export type RootStackParamList = { 
    Home: undefined,
    Landing: undefined,
    AddNewWallet: undefined,
    VerifyWalletDetails: { address: string },
    WalletDetails: { wallet: Wallet }
}

const Stack = createStackNavigator<RootStackParamList>();

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
          <Stack.Screen name="AddNewWallet" component={AddNewWallet} />
          <Stack.Screen name="VerifyWalletDetails" component={VerifyWalletDetails} />
          <Stack.Screen name="WalletDetails" component={WalletDetails} />
        </Stack.Navigator>
    );
};
