import React, {useEffect} from 'react';

//Libs
import { createStackNavigator } from '@react-navigation/stack';

//Pages
import Landing from '../screens/landing';
import WalletDetected from '../screens/walletDetected';
import CreateKeychain from '../screens/createKeychain';
import VerifyWallet from '../screens/verifyWallet';

export type RootStackParamList = {
  Landing: undefined,
  NewWalletConnect: { address: string },
  VerifyWallet: undefined,
  // WalletDetails: { wallet: Wallet },
  WalletDetected: undefined,
  CreateKeychain,
  Logout: undefined,
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
        <Stack.Screen name="Landing" component={Landing} />
        <Stack.Screen name="CreateKeychain" component={CreateKeychain} />
        <Stack.Screen name="WalletDetected" component={WalletDetected} />
        <Stack.Screen name="VerifyWallet" component={VerifyWallet} />

        {/*<Stack.Screen name="Profile" component={Profile} />*/}
        {/*<Stack.Screen name="AddNewWallet" component={AddNewWallet} />*/}
        {/*<Stack.Screen name="WalletDetails" component={WalletDetails} />*/}
        {/*<Stack.Screen name="RemoveWallet" component={RemoveWallet} />*/}

      </Stack.Navigator>
  );
};
