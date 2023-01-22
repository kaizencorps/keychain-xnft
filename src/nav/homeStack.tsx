import React, {useEffect} from 'react';

//Libs
import { createStackNavigator } from '@react-navigation/stack';

// not necessarily logged in screens
import Landing from '../screens/landing';
import WalletDetails from '../screens/walletDetails';
import WalletDetected from '../screens/walletDetected';
import CreateKeychain from '../screens/createKeychain';
import VerifyWallet from '../screens/verifyWallet';

// logged in screens
import AddNewWallet from '../screens/loggedIn/addNewWallet';
import Profile from '../screens/loggedIn/profile';
import RemoveWallet from '../screens/loggedIn/removeWallet';
import PendingWallet from '../screens/loggedIn/pendingWallet';
import Logout from '../screens/loggedIn/logout';

//Types
import { Wallet } from '../types/wallet';
import {KeyState} from "../types/NFT";

export type RootStackParamList = {
    Profile: undefined,
    Landing: undefined,
    AddNewWallet: undefined,
    RemoveWallet: { keyState: KeyState, index: number },
    VerifyWallet: undefined,
    PendingWallet: undefined,
    WalletDetails: { wallet: Wallet },
    WalletDetected: undefined,
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
          <Stack.Screen name="PendingWallet" component={PendingWallet} />
          <Stack.Screen name="WalletDetails" component={WalletDetails} />
          <Stack.Screen name="WalletDetected" component={WalletDetected} />
          <Stack.Screen name="CreateKeychain" component={CreateKeychain} />
          <Stack.Screen name="Logout" component={Logout} />
          <Stack.Screen name="RemoveWallet" component={RemoveWallet} />
          <Stack.Screen name="VerifyWallet" component={VerifyWallet} />
        </Stack.Navigator>
    );
};
