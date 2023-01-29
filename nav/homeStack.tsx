import React, {useEffect} from 'react';

//Libs
import { createStackNavigator } from '@react-navigation/stack';

//Screens
import WalletDetails from '../screens/walletDetails';
import AddNewWallet from '../screens/loggedIn/addNewWallet';
import Profile from '../screens/loggedIn/profile';
import RemoveWallet from '../screens/loggedIn/removeWallet';
import PendingWallet from '../screens/loggedIn/pendingWallet';
import Logout from '../screens/loggedIn/logout';

//Types
import { Wallet } from '../types/wallet';
import {KeyState} from "../types/NFT";
import { PublicKey } from '@solana/web3.js';

export type RootStackParamList = {
    Profile: undefined,
    Landing: undefined,
    AddNewWallet: undefined,
    RemoveWallet: { keyState: KeyState, index: number },
    PendingWallet: { address: PublicKey },
    WalletDetails: { wallet: Wallet },
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
          <Stack.Screen name="Logout" component={Logout} />
          <Stack.Screen name="RemoveWallet" component={RemoveWallet} />
        </Stack.Navigator>
    );
};
