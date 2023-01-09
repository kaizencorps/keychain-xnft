import React from 'react';

//Components
import WalletKaizens from '../components/wallet-kaizens';

//Data
import DummyData from './dummy-data';


const Gallery : React.FC<any> = () : React.ReactElement => {

  return (
      <div className="flex flex-1 flex-col p-4 items-center bg-backgroundBlack">
        <div className="w-full max-w-5xl overflow-hidden">
          {DummyData.map((walletKaizens, i: number) => <WalletKaizens key={i} index={i} items={walletKaizens.kaizens} walletAddress={walletKaizens.name} />)}
        </div>
      </div>
  )
}

export default Gallery;
