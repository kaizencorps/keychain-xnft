import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';

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
    <ScrollView contentContainerStyle={{ flex: 1 }}>
      <View style={styles.con}>
        <View style={styles.maxCon}>
          {/* TODO Favorites */}
          <WalletNFTs
            key={0} index={0}
            walletAddress={'MY FAVORITES'}
            items={useRecoilValue(walletNftsSelector(keychain.keychainAccount))}
            goToFocusNFT={goToFocusNFT}
          />
          <WalletNFTs
            key={1} index={1}
            walletAddress={keychain.keychainAccount.toBase58()}
            items={useRecoilValue(walletNftsSelector(keychain.keychainAccount))}
            goToFocusNFT={goToFocusNFT}
          />
          {keychain.keys.map((key, i) => {
            return (
              <WalletNFTs
                key={i + 2}
                index={i + 2}
                items={useRecoilValue(walletNftsSelector(key.wallet))}
                walletAddress={key.wallet.toBase58()}
                goToFocusNFT={goToFocusNFT}
              />
            )
          })}
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  con: {
    flex: 1,
    flexDirection: 'column',
    padding: Theme.SPACING.MD,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Theme.COLORS.BACKGROUND_BLACK
  },
  maxCon: {
    width: '100%',
    maxWidth: Theme.MAX_WIDTH_CON,
    minHeight: Theme.MIN_HEIGHT_CON,
    justifyContent: 'flex-start',
    flexDirection: 'column',
},
})


export default Gallery;
