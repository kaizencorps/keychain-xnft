import React from 'react';

//Components
import WalletKaizens from '../../components/wallet-kaizens';
import { View, StyleSheet } from 'react-native';

//Data
import DummyData from '../dummy-data';
import {useRecoilValue} from "recoil";
import { keychainAtom, walletNftsSelector } from '../../_state/keychain';


const About : React.FC<any> = () : React.ReactElement => {

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
