import React, {FC, ReactElement, useCallback, useMemo} from 'react';
import {ConnectionProvider, WalletProvider} from '@solana/wallet-adapter-react';
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

// todo: can't figure out how to include this in webpack/build, so for now this is just stuck in index.html
import '@solana/wallet-adapter-react-ui/styles.css';

import {RPC_URL, SOLANA_NETWORK} from '../../types/utils/config';

interface Props {
  component: any
}

export const ProviderComponentWrapper : FC<Props> = ({ component }) : ReactElement => {

  const onWalletError = useCallback(
      (error: any) => {
        // todo: use toastify-react-native
        // toast(error.message ? `${error.name}: ${error.message}` : error.name, { type: 'error' })
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
        new SolflareWalletAdapter({ network: SOLANA_NETWORK }),
        new BackpackWalletAdapter(),
        new TrustWalletAdapter(),
        new CloverWalletAdapter(),
        new Coin98WalletAdapter(),
        // @ts-ignore
        new GlowWalletAdapter({ network: SOLANA_NETWORK }),
      ],
      []
  );

  return (
      <ConnectionProvider endpoint={RPC_URL}>
        <WalletProvider wallets={wallets} onError={onWalletError} autoConnect>
          <WalletModalProvider>{component}</WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
  );
}
