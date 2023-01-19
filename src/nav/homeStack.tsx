import React from 'react';

//Libs
import { createStackNavigator } from '@react-navigation/stack';

//Pages
import Profile from '../screens/profile';
import Landing from '../screens/landing';
import AddNewWallet from '../screens/addNewWallet';
import VerifyWalletDetails from '../screens/verifyWalletDetails';
import WalletDetails from '../screens/walletDetails';
import WalletDetected from '../screens/walletDetected';
import CreateKeychain from '../screens/createKeychain';
import Logout from '../screens/logout';
import RemoveWallet from '../screens/removeWallet';
import NewWalletConnect from '../screens/newWalletConnect';

//Types
import { Wallet } from '../types/wallet';

export type RootStackParamList = { 
    Profile: undefined,
    Landing: undefined,
    AddNewWallet: undefined,
    RemoveWallet: { address: string, index: number },
    NewWalletConnect: { address: string },
    VerifyWalletDetails: { address: string },
    WalletDetails: { wallet: Wallet },
    WalletDetected: { address: string },
    CreateKeychain: { address: string },
    Logout: undefined,
}

const Stack = createStackNavigator<RootStackParamList>();

export default () => {
    

    return (
        <Stack.Navigator
            initialRouteName='Profile'
            screenOptions={{
                headerShown: false
            }}
        >
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="AddNewWallet" component={AddNewWallet} />
          <Stack.Screen name="VerifyWalletDetails" component={VerifyWalletDetails} />
          <Stack.Screen name="WalletDetails" component={WalletDetails} />
          <Stack.Screen name="WalletDetected" component={WalletDetected} />
          <Stack.Screen name="CreateKeychain" component={CreateKeychain} />
          <Stack.Screen name="Logout" component={Logout} />
          <Stack.Screen name="RemoveWallet" component={RemoveWallet} />
          <Stack.Screen name="NewWalletConnect" component={NewWalletConnect} />
        </Stack.Navigator>
    );
};
