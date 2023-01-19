import React from 'react';

//Components
import WalletKaizens from '../components/wallet-kaizens/wallet-kaizens';
import { View, StyleSheet } from 'react-native';

//Types
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { RootStackParamList } from '../nav/aboutStack';

//Data
import DummyData from './dummy-data';
import {useRecoilValue} from "recoil";
import { keychainAtom, walletNftsSelector } from '../_state/keychain';

interface Props extends BottomTabScreenProps<RootStackParamList, 'About'> {
  // other props ...
}


const About : React.FC<any> = (props: Props) : React.ReactElement => {

  const keychain = useRecoilValue(keychainAtom);

  return (
      <View style={styles.con}>

      </View>
  )
}

const styles = StyleSheet.create({
  con: {

  }
});

export default About;
