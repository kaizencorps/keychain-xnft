import React, { FC, ReactElement } from 'react';

//Components
import { View } from 'react-native';
import Loader from '../loader/loader';

//Types
import { CollectionsState, Collection, NFT } from 'types/NFT';

//Data
import { useRecoilState, useRecoilValue } from 'recoil';
import { collectionsAtom, keychainAtom, userProfileAtom } from '_state';
import useKeychainServer from 'hooks/apis/keychainServer/useKeychainServer';
import { getNFTsForOwner } from 'utils/web3/chain-utils';

interface Props {
  children: React.ReactNode
}


export const DataRetrieval : FC<any> = (props: Props) : ReactElement => {

  const keychainServer = useKeychainServer();
  const [keychainState, setKeychainState] = useRecoilState(keychainAtom);
  const [collectionsState] = useRecoilState(collectionsAtom);
  const userProfile = useRecoilValue(userProfileAtom);
  const [isLoading, toggleLoading] = React.useState(true);
  const [_, setCollections] = useRecoilState<CollectionsState>(collectionsAtom);

  React.useEffect(() => {
    getCollections();
  }, [])

  React.useEffect(() => {
    if(collectionsState.collections.length){
      getNFTs();
    }
  }, [collectionsState.collections.length])

  const getCollections = async () => {
    keychainServer.getQualifiedCollections()
      .then(res => setCollections({ collections: res.data.data as Collection[] }))
      .catch(e => console.log("Error retrieving collections: ", e))
      .finally(() => toggleLoading(false));
  }

  const getNFTs = async () => {
    let nfts: NFT[] = [];
    if (keychainState.walletVerified) {
        for (let key of keychainState.keys) {
            if (key.verified) {
                const walletSetOfNFTS = await getNFTsForOwner(key.wallet, collectionsState, userProfile.profile.favorites);
                nfts = nfts.concat(walletSetOfNFTS);
            }
        }
    }
    setKeychainState(prev => ({
      ...prev,
      nfts
    }))
  }

  if(isLoading) return <Loader />

  return (
    <View style={{ flex: 1 }}>
      {props.children}
    </View>
  );
};


export default DataRetrieval;