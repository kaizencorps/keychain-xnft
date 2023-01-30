import React, {useEffect} from 'react';

//Components
import ScreenWrapper from '../../components/screenWrapper/screenWrapper';
import { View, StyleSheet } from 'react-native';
import WalletNFTs from '../../components/wallet-NFTs/wallet-NFTs';

//Types
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { RootStackParamList } from '../../nav/galleryStack';
import { NFT } from '../../types/NFT';

//Hooks
import { useAnalyticsActions } from '../../_actions/analytics.actions';

//Data
import {useRecoilValue} from "recoil";
import { keychainAtom, walletNftsSelector } from '../../_state/keychain';
import { favoriteNfts } from '../../_state';

//Styles
import * as Theme from '../../constants/theme';

interface Props extends BottomTabScreenProps<RootStackParamList, 'GalleryLanding'> {}

const Gallery : React.FC<any> = (props: Props) : React.ReactElement => {

  const keychain = useRecoilValue(keychainAtom);
  const analyticsActions = useAnalyticsActions();

  const goToFocusNFT = (nft: NFT, walletAddress: string) => {
    console.log("Going to focus NFT ", walletAddress);
    props.navigation.navigate('NFTData', { walletAddress, nft })
  }

  useEffect(() => {
    analyticsActions.trackPage('Gallery');
  });

  return (
    <ScreenWrapper>
      <View style={styles.maxCon}>
        <WalletNFTs
          key={0} index={0}
          walletAddress={'MY FAVORITES'}
          items={useRecoilValue(favoriteNfts)}
          goToFocusNFT={goToFocusNFT}
        />
        {keychain.keys.map((key, i) => {
          return key.verified ? (
            <WalletNFTs
              key={i}
              // index in keychain starts at 0, but we want to start at 1
              index={key.index + 1}
              items={useRecoilValue(walletNftsSelector(key.wallet))}
              walletAddress={key.wallet.toBase58()}
              goToFocusNFT={goToFocusNFT}
            />
          ) : null
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
