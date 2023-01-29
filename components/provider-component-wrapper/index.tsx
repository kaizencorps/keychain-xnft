import React, {FC, ReactElement, useCallback, useMemo} from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import {
  BackpackWalletAdapter,
  CloverWalletAdapter,
  Coin98WalletAdapter,
  GlowWalletAdapter,
  LedgerWalletAdapter,
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  TorusWalletAdapter,
  TrustWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import {WalletModalProvider} from '@solana/wallet-adapter-react-ui';

//Hooks
import useToasts from '../../hooks/useToasts';

// having this breaks the webpack build
// import '@solana/wallet-adapter-react-ui/styles.css';

//Constants
import { HELIUS_RPC_URL } from '../../constants/apis';
import Constants from 'expo-constants';

//Types
import { NOTI_STATUS } from '../../_state';

interface Props {
  component: any
}

export const ProviderComponentWrapper : FC<Props> = ({ component }) : ReactElement => {

  const { createToast } = useToasts();

  const onWalletError = useCallback(
      (error: any) => {
        createToast(
          error.message ? `${error.name}: ${error.message}` : `Error interacting with wallet: ${error.name}`,
          NOTI_STATUS.ERR
        )
      },
    [],
  );


  // eslint-disable-next-line react-hooks/exhaustive-deps
  const wallets = useMemo(
      () => [
        new PhantomWalletAdapter(),
        new TorusWalletAdapter(),
        new LedgerWalletAdapter(),
        // @ts-ignore
        new SolflareWalletAdapter({ network: Constants.expoConfig.extra.SOLANA_NETWORK }),
        new BackpackWalletAdapter(),
        new TrustWalletAdapter(),
        new CloverWalletAdapter(),
        new Coin98WalletAdapter(),
        // @ts-ignore
        new GlowWalletAdapter({ network: Constants.expoConfig.extra.SOLANA_NETWORK }),
      ],
      []
  );

  return (
      <ConnectionProvider endpoint={HELIUS_RPC_URL}>
        <WalletProvider wallets={wallets} onError={onWalletError} autoConnect>
          <WalletModalProvider>{component}</WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
  );
}
