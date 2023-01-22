import React from 'react';
import { View, StyleSheet } from 'react-native';
import ScreenWrapper from '../../components/screenWrapper/screenWrapper';

//Components
import WalletNFTs from '../../components/wallet-NFTs/wallet-NFTs';

//Types
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { RootStackParamList } from '../../nav/galleryStack';
import { NFT } from '../../types/NFT';

//Data
import {useRecoilValue} from "recoil";
import { keychainAtom, walletNftsSelector } from '../../_state/keychain';

//Styles
import * as Theme from '../../constants/theme';

interface Props extends BottomTabScreenProps<RootStackParamList, 'GalleryLanding'> {}

const Gallery : React.FC<any> = (props: Props) : React.ReactElement => {

  const keychain = useRecoilValue(keychainAtom);

  const goToFocusNFT = (nft: NFT, walletAddress: string) => {
    props.navigation.navigate('NFTData', { walletAddress, nft })
  }

  
  return (
    <ScreenWrapper>
      <View style={styles.maxCon}>
        {/* TODO Favorites */}
        <WalletNFTs
          key={0} index={0}
          walletAddress={'MY FAVORITES'}
          items={useRecoilValue(walletNftsSelector(keychain.keychainAccount))}
          goToFocusNFT={goToFocusNFT}
        />
        {keychain.keys.map((key, i) => {
          return (
            <WalletNFTs
              key={i + 1}
              index={i + 1}
              items={useRecoilValue(walletNftsSelector(key.wallet))}
              walletAddress={key.wallet.toBase58()}
              goToFocusNFT={goToFocusNFT}
            />
          )
        })}
      </View>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  maxCon: {
    width: '100%',
    maxWidth: Theme.MAX_WIDTH_CON,
    minHeight: Theme.MIN_HEIGHT_CON,
    justifyContent: 'flex-start',
    flexDirection: 'column',
  },
})


export default Gallery;
