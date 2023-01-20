import React from 'react';

//Components
import WalletNFTs from '../components/wallet-NFTs/wallet-NFTs';
import ScreenWrapper from '../components/screenWrapper/screenWrapper';
import { View, StyleSheet } from 'react-native';

//Types
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { RootStackParamList } from '../nav/aboutStack';

//Data
import {useRecoilValue} from "recoil";
import { keychainAtom, walletNftsSelector } from '../_state/keychain';

// TODO Might not actually use this page. About tab might only be 'Socials' screen


interface Props extends BottomTabScreenProps<RootStackParamList, 'About'> {}


const About : React.FC<any> = (props: Props) : React.ReactElement => {

  const keychain = useRecoilValue(keychainAtom);

  return (
      <ScreenWrapper>

      </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  con: {

  }
});

export default About;
