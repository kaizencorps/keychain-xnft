import React from 'react';

//Components
import WalletNFTs from '../components/wallet-NFTs/wallet-NFTs';
import { View, StyleSheet } from 'react-native';

//Types
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { RootStackParamList } from '../nav/aboutStack';

//Data
import {useRecoilValue} from "recoil";
import { keychainAtom, walletNftsSelector } from '../_state/keychain';
import {walletAtom} from "../_state";
import useAsyncEffect from "use-async-effect";
import {AnchorWallet, useAnchorWallet} from "@solana/wallet-adapter-react";
import {useWalletActions} from "../_actions/wallet.actions";
import {consoleLog} from "../_helpers/debug";
import {useKeychainActions} from "../_actions/keychain.actions";
import * as Theme from "../constants/theme";
import {WalletMultiButton} from "@solana/wallet-adapter-react-ui";



interface Props extends BottomTabScreenProps<RootStackParamList, 'About'> {}


const Test : React.FC<any> = (props: Props) : React.ReactElement => {

  const anchorWallet: AnchorWallet | undefined = useAnchorWallet();
  const keychain = useRecoilValue(keychainAtom);
  const wallet = useRecoilValue(walletAtom);

  const walletActions = useWalletActions();
  const keychainActions = useKeychainActions();

  useAsyncEffect(async () => {
    if (anchorWallet) {
      await walletActions.connectWallet(anchorWallet);
      consoleLog('wallet has been set up');
    } else {
      await walletActions.disconnectWallet();
    }

  }, [anchorWallet]);

  useAsyncEffect(async () => {
    consoleLog('got new wallet state: ', wallet);
    if (wallet) {
      consoleLog('checking keychain by key: ', wallet.address);
      await keychainActions.checkKeychainByKey();
    }
  }, [wallet]);

  useAsyncEffect(async () => {
    if (keychain) {
      // consoleLog('checking keychain by key: ', wallet.address);
      // await keychainActions.checkKeychainByKey();
    }

  }, [keychain]);

  return (
      <View style={styles.con}>
        <WalletMultiButton style={styles.fatPinkButton}>
          Connect Wallet
        {/*  <View style={{ flexDirection: 'row', alignItems: 'center' }}>*/}
        {/*    <Wallet color={Theme.COLORS.LABEL_TEXT_WHITE} />*/}
        {/*    <HeaderText style={{ color: Theme.COLORS.LABEL_TEXT_WHITE, marginLeft: 5 }}>CONNECT WALLET</HeaderText>*/}
        {/*  </View>*/}
        </WalletMultiButton>
      </View>
  )
}

const styles = StyleSheet.create({
  con: {
    display:"flex",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Theme.COLORS.BACKGROUND_BLACK
  },
  subCon:{
    display:"flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  card1: {
    width: "100%",
    backgroundColor: Theme.COLORS.BACKGROUND_BLACK,
    display:"flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  card2:{
    width: "100%",
    backgroundColor: Theme.COLORS.BACKGROUND_BLACK,
    display:"flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    margin: 10,

  },
  logo:{
    width: 150,
    height: 150,
  },
  text: {
    color: Theme.COLORS.LABEL_TEXT_WHITE,
    textAlign: "center",
  },
  tex3:{
    margin:32
  },
  text2: {
    color: Theme.COLORS.ACTIVE_PINK,
    marginBottom: Theme.SPACING.MD
  },
  button:{
    width: "100%",
    borderRadius: Theme.BRADIUS.XL,
    margin: 16,
    backgroundColor: Theme.COLORS.ACTIVE_PINK,
    color: Theme.COLORS.LABEL_TEXT_WHITE,
    fontSize: Theme.SPACING.MD,
    fontFamily: 'BlenderPro-Bold',
    display: "flex",
    justifyContent: "center",
    padding: Theme.SPACING.XL,
    marginHorizontal: Theme.SPACING.SM
  },
  fatPinkButton: {
    backgroundColor: Theme.COLORS.ACTIVE_PINK
  }
});

export default Test;
