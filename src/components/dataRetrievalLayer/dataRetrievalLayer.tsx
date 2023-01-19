import React, { FC, ReactElement } from 'react';

//Components
import { View } from 'react-native';

//Data
import { useRecoilState } from 'recoil';
import { walletAtom } from '../../_state';

//Web3
import { getMetadata } from '../../apis/helius/helius';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { Connection } from "@solana/web3.js";

interface Props {
  children: React.ReactNode,
}

// TODO This should first utilize keychain to retrieve all linked wallets
// Once those wallets are connected, this should retrieve all the NFT data for each wallet
// Only then should the user proceed deeper into the app

export const DataRetrievalLayer : FC<any> = (props: Props) : ReactElement => {

  const [wallet, setWallet] = useRecoilState(walletAtom);

  React.useEffect(() => {
    getBalance();
  }, [wallet])

  const getBalance = async () => {
    if(wallet.address){
      const conn = new Connection("https://rpc.helius.xyz/?api-key=a29cc29b-450f-44fa-8947-2909393c67bb");

      const tokenAccounts = await conn.getParsedTokenAccountsByOwner(wallet.address, {
        programId: TOKEN_PROGRAM_ID,
      });
    
      const parsedTokens = tokenAccounts.value
          .filter((t: any) => {
            const amount = t.account.data.parsed.info.tokenAmount;
            return amount.decimals === 0 && amount.uiAmount === 1;
          })
          .map((t: any) => {
            return { pubkey: t.pubkey, mint: t.account.data.parsed.info.mint };
          });

      getTokenMetaDatas(parsedTokens.map(tokenAccount => tokenAccount.mint));
    }
  }

  const getTokenMetaDatas = async (tokenAddresses: string[]) => {
    getMetadata(tokenAddresses)
      .then(res =>{
        // TODO parse out errored responses 
        // TODO add all NFT information to recoil state
      })
      .catch(e => console.log("err: ", e));
  }

  return (
    <View style={{ flex: 1 }}>
      {props.children}
    </View>
  )
};


export default DataRetrievalLayer;