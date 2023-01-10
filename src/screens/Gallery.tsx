import React from 'react';

//Components
import WalletKaizens from '../components/wallet-kaizens';

//Data
import DummyData from './dummy-data';
import {useRecoilValue} from "recoil";
import { keychainAtom, walletNftsSelector } from '../_state/keychain';


const Gallery : React.FC<any> = () : React.ReactElement => {

  const keychain = useRecoilValue(keychainAtom);

  return (
      <div className="flex flex-1 flex-col p-4 items-center bg-backgroundBlack">
        <div className="w-full max-w-5xl overflow-hidden">
          {keychain.keys.map((key, i) => {
            return <WalletKaizens key={i} index={i} items={useRecoilValue(walletNftsSelector(key.wallet))} walletAddress={key.wallet.toBase58()}  />
          })}
        </div>
      </div>
  )
}

export default Gallery;
