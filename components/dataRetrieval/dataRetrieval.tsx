import React, { FC, ReactElement } from 'react';

//Components
import { View } from 'react-native';
import Loader from '../loader/loader';

//Types
import { CollectionsState, Collection } from '../../types/NFT';

//Data
import { useRecoilState } from 'recoil';
import { collectionsAtom } from '../../_state';
import useKeychainServer from '../../hooks/apis/keychainServer/useKeychainServer';

interface Props {
  children: React.ReactNode
}


export const DataRetrieval : FC<any> = (props: Props) : ReactElement => {

  const keychainServer = useKeychainServer();
  const [isLoading, toggleLoading] = React.useState(true);
  const [_, setCollections] = useRecoilState<CollectionsState>(collectionsAtom);

  React.useEffect(() => {
    getCollections();
  }, [])

  const getCollections = () => {
    keychainServer.getQualifiedCollections()
      .then(res => setCollections({ collections: res.data.data as Collection[] }))
      .catch(e => console.log("Error retrieving collections: ", e))
      .finally(() => toggleLoading(false));
  }

  if(isLoading) return <Loader />

  return (
    <View style={{ flex: 1 }}>
      {props.children}
    </View>
  );
};


export default DataRetrieval;