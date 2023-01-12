import React, {FC, ReactElement, useState} from "react";

//Components
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { HeaderText, NormalText, SubHeaderText } from "../../components/ui/text";
import { Wallet, NewWallet, VerifyWallet } from "../../components/wallet-header";

//Data
import {useWalletActions} from "../../_actions/wallet.actions";
import {consoleLog} from "../../_helpers/debug";
import {useUserActions} from "../../_actions/user.actions";
import {keychainAtom} from "../../_state/keychain";
import {useRecoilValue} from "recoil";

//Types
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

//Styles
import * as Theme from '../../constants/theme';

interface Props {
  navigation: BottomTabNavigationProp<ParamList>,
  route: RouteProp<ParamList, T>
}


const Home : FC<any> = () : ReactElement => {

  const keychain = useRecoilValue(keychainAtom);

  return (
    <View style={styles.con}>
      <View style={styles.topCon}>
        <Image />
        <HeaderText style={{ color: Theme.COLORS.LABEL_TEXT_WHITE }}>PLACEHOLDER</HeaderText>
        <NormalText style={{ color: Theme.COLORS.ACTIVE_PINK }}>--- NFTs</NormalText>
        <NormalText style={{ color: Theme.COLORS.ACTIVE_PINK }}>--- Collections</NormalText>
      </View>
      <View style={styles.botCon}>
        <View>
          <NormalText>PROFILE WALLETS</NormalText>
          {/* TODO GET WALLETS FROM PLACE */}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  con: {

  },
  topCon: {
    flex: 1,
    backgroundColor: Theme.COLORS.BACKGROUND_BLACK
  }
});

export default Home;
