import React from 'react';

//Components
import { View, StyleSheet, Image, ScrollView } from 'react-native';
import { Box } from '../components/ui/text-box/text-box';
import { HeaderText, NormalText } from '../components/ui/text/text';
import ScreenWrapper from '../components/screenWrapper/screenWrapper';

//Types
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { RootStackParamList } from '../nav/homeStack';

//Web3
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { AnchorWallet, useAnchorWallet, useWallet } from "@solana/wallet-adapter-react";

//Hooks
import { useWalletActions } from "../_actions/wallet.actions";

//SVGs
import Chevron from '../assets/svgs/Icons/chevron';
import Wallet from '../assets/svgs/Icons/wallet'

//Styles
import * as Theme from "../constants/theme";
import {useRecoilValue} from "recoil";
import {keychainAtom} from "../_state";
import {consoleLog} from "../_helpers/debug";
import {walletAtom} from "../_state";
import {useKeychainActions} from "../_actions/keychain.actions";

import useAsyncEffect from 'use-async-effect';


interface Props extends BottomTabScreenProps<RootStackParamList, 'Landing'> { }


const Landing : React.FC<any> = (props: Props) : React.ReactElement => {

  const walletActions = useWalletActions();
  const keychainActions = useKeychainActions();

  const anchorWallet: AnchorWallet | undefined = useAnchorWallet();
  const { signMessage } = useWallet();

  const wallet = useRecoilValue(walletAtom);
  const keychain = useRecoilValue(keychainAtom);

  React.useEffect(() => {
    if (wallet && !keychain.checked) {
      (async () => {
        consoleLog('checking keychain by key: ', wallet.address);
        await keychainActions.checkKeychainByKey(); 
      })();
    } else if(!anchorWallet && wallet) {
      (async () => {
        consoleLog('landing: disconnecting wallet');
        await keychainActions.resetKeychain(true);
      })();
    } 
  }, [wallet])

  React.useEffect(() => {
    if (anchorWallet && !wallet) {
      (async () => {
        consoleLog('landing: connecting wallet');
        await walletActions.connectWallet(anchorWallet, signMessage);
      })();
    }
  }, [anchorWallet])

  useAsyncEffect(async () => {
    consoleLog('got new keychain state: ', keychain);
    if (keychain.checked) {
      // 2 options:
      // 1. if keychain exists and wallet is verified, go to home
      // 2. otherwise, navigate to the new wallet detected page
      if (keychain.walletVerified) {
        // todo: navigate to profile page (logged in)
      } else {
        // todo: navigate to the verification screen
        consoleLog('navigating to WalletDetected screen');
        props.navigation.navigate('WalletDetected');
      }
    }
    if (keychain.checked && keychain.walletVerified) {
      // todo: then we need to navigate to the "logged in" profile stack
      consoleLog('todo: navigate to profile / logged in screen');
        // then we need to navigate to new wallet detected screen
    }
  }, [keychain]);

  return (
    <ScreenWrapper>
      <View style={styles.subCon}>
        <View style={styles.card1}>
          <Image source={require("../assets/pngs/Keychain-Logo.png")} style={styles.logo} />
        </View>
        <NormalText style={styles.text}>Keychain is an on-chain component that combines your NFTs from multiple wallets to be accessible by one account</NormalText>
        <View style={styles.card2}>
          <NormalText style={styles.text2}>HOW IT WORKS</NormalText>
          <Box letras='Connect a wallet to create a profile.' />
          <Chevron color={Theme.COLORS.ACTIVE_PINK} rotation={90}/>
          <Box letras='Add another wallet to your profile.' />
          <Chevron color={Theme.COLORS.ACTIVE_PINK} rotation={90}/>
          <Box letras='View all your NFTs in the gallery.' />

        </View>
        <WalletMultiButton style={styles.fatPinkButton}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Wallet color={Theme.COLORS.LABEL_TEXT_WHITE} />
            <HeaderText style={{ color: Theme.COLORS.LABEL_TEXT_WHITE, marginLeft: 5 }}>CONNECT WALLET</HeaderText>
          </View>
        </WalletMultiButton>
      </View>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
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

export default Landing;
