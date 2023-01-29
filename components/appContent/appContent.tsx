import React, { FC, ReactElement } from 'react';

//Components
import TabNavigator from '../../nav/nav';
import Loader from '../loader/loader';
import { View } from 'react-native';
import Toasts from '../toast/toast';

//Hooks
import useKeychainServer from '../../hooks/apis/keychainServer/useKeychainServer';

//Data
import { useRecoilState, useRecoilValue } from 'recoil';
import { useWalletActions } from '../../_actions/wallet.actions';
import { isValidToken } from '../../_state';
import { userProfileAtom } from '../../_state';
import { walletAtom } from '../../_state';

//Web3
import { AnchorWallet, useAnchorWallet, useWallet } from "@solana/wallet-adapter-react";
import { keychainAtom } from '../../_state';
import { PublicKey } from '@solana/web3.js';
import { useKeychainActions } from '../../_actions/keychain.actions';



export const AppContent : FC<any> = () : ReactElement => {

  const walletActions = useWalletActions();
  const keychainActions = useKeychainActions();
  const keychainServer = useKeychainServer();
  const anchorWallet: AnchorWallet | undefined = useAnchorWallet();
  const { signMessage } = useWallet();

  const [initialLoad, setInitialLoad] = React.useState(true);
  const [keychain, setKeychain] = useRecoilState(keychainAtom);
  const isTokenExpired = useRecoilValue(isValidToken);
  const [userProfileState, setUserProfileState] = useRecoilState(userProfileAtom);
  const wallet = useRecoilValue(walletAtom);

  React.useEffect(() => {
    autoConnect();
  }, []);

  React.useEffect(() => {
    if (wallet && !keychain.checked) {
      (async () => {
        console.log("1")
        await keychainActions.checkKeychainByKey();
      })();
    } else if(!anchorWallet && wallet) {
      (async () => {
        console.log('2')
        await keychainActions.resetKeychain(true);
      })();
    }
  }, [wallet])

  React.useEffect(() => {
    if (anchorWallet && !wallet) {
      (async () => {
        console.log('3')
        await walletActions.connectWallet(anchorWallet, signMessage);
      })();
    }
  }, [anchorWallet])

  React.useEffect(() => {
    console.log("keychain did change? ", keychain);
  }, [keychain.keychainAccount])

  const autoConnect = async () => {
    if (anchorWallet) {
      console.log("anchor wallet exists");
      // TODODODODODOD THIS is what's not auto triggering ^^^^^^^^^^^^^^^^^^^^^^
      await walletActions.connectWallet(anchorWallet, signMessage);
      // TODO automatic connection to keychain
      // TODO if keychain is connected, autoConnectToKaizenServer();
      setInitialLoad(false); 
    } else {
      await walletActions.disconnectWallet();
      setInitialLoad(false);
    }
  }

  const autoConnectToKaizenServer = async () => {
    console.log("Attempting auto connect to server...")
    console.log("Token is valid: ", isTokenExpired);
    if(!isTokenExpired){
      try {
        // Login without having to ask user to sign a transaction
        const res = await keychainServer.refreshAccessToken();
        console.log("Get user res: ", res);
        const { profile, accessToken } = res.data.data;
        localStorage.setItem('jwt', accessToken);
        setUserProfileState({
          jwt: accessToken,
          profile: { 
            profileNft: {
              mint: profile.profileNft.mint,
              pic: profile.profileNft.pic,
            },
            favorites: profile.favorites
          }
        })
        // Setting userProfileState will automatically force a navigation to 'Profile' screen
      } catch (e) {
        resetState();
      } finally {
        setInitialLoad(false);
      }
    } else {
      resetState();
      setInitialLoad(false);
    }
  }

  const resetState = () => {
    localStorage.removeItem('jwt');
    setUserProfileState(prev => ({
      ...prev,
      jwt: null
    }))
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
