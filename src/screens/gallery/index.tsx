import React from 'react';
import { View, StyleSheet } from 'react-native';

//Components
import WalletKaizens from '../../components/wallet-kaizens';

//Types
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { RootStackParamList } from '../../nav/galleryStack';

//Data
import DummyData from '../dummy-data';
import {useRecoilValue} from "recoil";
import { keychainAtom, walletNftsSelector } from '../../_state/keychain';

//Styles
import * as Theme from '../../constants/theme';

interface Props extends BottomTabScreenProps<RootStackParamList, 'Gallery'> {
  // other props ...
}

const Gallery : React.FC<any> = (props: Props) : React.ReactElement => {

  const keychain = useRecoilValue(keychainAtom);

  return (
      <View style={styles.con}>
        <View style={styles.main}>
          {keychain.keys.map((key, i) => {
            return <WalletKaizens key={i} index={i} items={useRecoilValue(walletNftsSelector(key.wallet))} walletAddress={key.wallet.toBase58()}  />
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
    backgroundColor: Theme.COLORS.BACKGROUND_BLACK
  },
  main: {
    width: '100%',
    maxWidth: 700,
    overflow: 'hidden',
  }
})


export default Gallery;
