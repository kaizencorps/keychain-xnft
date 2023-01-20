import React, { FC, ReactElement } from 'react';

//Components
import TabNavigator from '../../nav/nav';
import Loader from '../loader/loader';

//Data
import { useWalletActions } from '../../_actions/wallet.actions';

//Web3
import { AnchorWallet, useAnchorWallet, useWallet } from "@solana/wallet-adapter-react";


export const AppContent : FC<any> = () : ReactElement => {

  const [initialLoad, setInitialLoad] = React.useState(true);

  const walletActions = useWalletActions();

  const anchorWallet: AnchorWallet | undefined = useAnchorWallet();
  const { signMessage } = useWallet();

  React.useEffect(() => {
    autoConnect();
  }, [anchorWallet])

  const autoConnect = async () => {
    // if (anchorWallet && !loggedIn) {
    if (anchorWallet) {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      await walletActions.connectWallet(anchorWallet, signMessage);
      setInitialLoad(false)
    } else {
      await walletActions.disconnectWallet();
      setInitialLoad(false)
    }
  }

  if(initialLoad) return <Loader />

  return(
      <TabNavigator />
  )
};

export default AppContent
