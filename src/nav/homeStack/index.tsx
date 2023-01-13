import React from 'react';

//Libs
import { createStackNavigator } from '@react-navigation/stack';

//Pages
import Profile from '../../screens/profile';
import Landing from '../../screens/landing';
import AddNewWallet from '../../screens/addNewWallet';
import VerifyWalletDetails from '../../screens/verifyWalletDetails';
import WalletDetails from '../../screens/walletDetails';
import WalletDetected from '../../screens/walletDetected';
import CreateKeychain from '../../screens/createKeychain';

//Types
import { Wallet } from '../../types/wallet';

export type RootStackParamList = { 
    Profile: undefined,
    Landing: undefined,
    AddNewWallet: undefined,
    VerifyWalletDetails: { address: string },
    WalletDetails: { wallet: Wallet },
    WalletDetected: { address: string },
    CreateKeychain: { address: string },
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
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Landing" component={Landing} />
          <Stack.Screen name="AddNewWallet" component={AddNewWallet} />
          <Stack.Screen name="VerifyWalletDetails" component={VerifyWalletDetails} />
          <Stack.Screen name="WalletDetails" component={WalletDetails} />
          <Stack.Screen name="WalletDetected" component={WalletDetected} />
          <Stack.Screen name="CreateKeychain" component={CreateKeychain} />
        </Stack.Navigator>
    );
};
