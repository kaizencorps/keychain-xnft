import React, { FC, ReactElement } from 'react';

//Components
import TabNavigator from '../../nav/nav';
import Loader from '../loader/loader';
import { View } from 'react-native';
import Toasts from '../toast/toast';

//Data
import { useRecoilState, useRecoilValue } from 'recoil';
import { walletAtom } from '../../_state';

import { KeychainState } from '../../types/NFT';
import { useWalletActions } from '../../_actions/wallet.actions';
import { useKeychainActions } from '../../_actions/keychain.actions';

//Web3
import { AnchorWallet, useAnchorWallet, useWallet } from "@solana/wallet-adapter-react";

//Styles
import { keychainAtom } from '../../_state';


export const AppContent : FC<any> = () : ReactElement => {

  const [initialLoad, setInitialLoad] = React.useState(true);
  const [walletDetected, setWalletDetected] = React.useState(undefined);
  const [keychain] = useRecoilState<KeychainState>(keychainAtom);

  const wallet = useRecoilValue(walletAtom);

  const walletActions = useWalletActions();
  const keychainActions = useKeychainActions();

  const anchorWallet: AnchorWallet | undefined = useAnchorWallet();
  const { signMessage } = useWallet();

  React.useEffect(() => {
    console.log("APP CONTENT anchorWallet changing");
    autoConnect();
  }, [anchorWallet])

  const autoConnect = async () => {
    if (anchorWallet) {
      await walletActions.connectWallet(anchorWallet, signMessage);
      setInitialLoad(false);
    } else {
      await walletActions.disconnectWallet();
      setInitialLoad(false);
    }
  }

  if(initialLoad) return <Loader />

  return(
    <View style={{ flex: 1, position: 'relative' }}>
      <TabNavigator />
      <Toasts />
    </View>
  )
};

export default AppContent
