import React from 'react';
import { View, StyleSheet } from 'react-native';

//Components
import WalletNFTs from '../components/wallet-NFTs/wallet-NFTs';

//Types
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { RootStackParamList } from '../nav/galleryStack';

//Data
import {useRecoilValue} from "recoil";
import { keychainAtom, walletNftsSelector } from '../_state/keychain';

//Styles
import * as Theme from '../constants/theme';

interface Props extends BottomTabScreenProps<RootStackParamList, 'Gallery'> {}

const Gallery : React.FC<any> = (props: Props) : React.ReactElement => {

  const keychain = useRecoilValue(keychainAtom);


  return (
    <View style={styles.con}>
      <View style={styles.maxCon}>
        {/* TODO Favorites */}
        <WalletNFTs 
          key={0} index={0} 
          walletAddress={'MY FAVORITES'} 
          items={useRecoilValue(walletNftsSelector(keychain.keychainAccount))}
        />
        <WalletNFTs 
          key={1} index={1} 
          walletAddress={keychain.keychainAccount.toBase58()} 
          items={useRecoilValue(walletNftsSelector(keychain.keychainAccount))}
        />
        {keychain.keys.map((key, i) => {
          return (
            <WalletNFTs 
              key={i + 2} 
              index={i + 2} 
              items={useRecoilValue(walletNftsSelector(key.wallet))} 
              walletAddress={key.wallet.toBase58()}  
            />
          )
        })}
      </View>
    </View>
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
