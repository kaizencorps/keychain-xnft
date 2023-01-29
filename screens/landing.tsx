import React from 'react';

//Components
import { View, StyleSheet, Image } from 'react-native';
import { Box } from '../components/ui/text-box/text-box';
import { HeaderText, NormalText } from '../components/ui/text/text';
import ScreenWrapper from '../components/screenWrapper/screenWrapper';
import LoginToKaizenModal from '../components/modals/LoginToKaizen/loginToKaizen';

//Types
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { RootStackParamList } from '../nav/landingStack';
import { KeychainState } from '../types/NFT';

//Data
import { isValidToken, keychainAtom, userProfileAtom } from '../_state';
import { useAnalyticsActions } from '../_actions/analytics.actions';
import { walletAtom } from "../_state";
import { useKeychainActions } from "../_actions/keychain.actions";
import { useRecoilState, useRecoilValue } from "recoil";

//Web3
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { AnchorWallet, useAnchorWallet, useWallet } from "@solana/wallet-adapter-react";

//Hooks
import { useWalletActions } from "../_actions/wallet.actions";
import useAsyncEffect from 'use-async-effect';
import useKeychainServer from '../hooks/apis/keychainServer/useKeychainServer';

//SVGs
import Chevron from '../assets/svgs/Icons/chevron';
import Wallet from '../assets/svgs/Icons/wallet'

//Constants
import Constants from 'expo-constants';

//Styles
import * as Theme from "../constants/theme";
import { PublicKey } from '@solana/web3.js';
import { useNavigation } from '@react-navigation/native';



interface Props extends BottomTabScreenProps<RootStackParamList, 'Landing'> { }


const Landing : React.FC<any> = (props: Props) : React.ReactElement => {

  const walletActions = useWalletActions();
  const keychainActions = useKeychainActions();
  const analyticsActions = useAnalyticsActions();
  const keychainServer = useKeychainServer();
  const navigation = useNavigation();

  const anchorWallet: AnchorWallet | undefined = useAnchorWallet();
  const { signMessage } = useWallet();

  const wallet = useRecoilValue(walletAtom);
  const [userProfileState, setUserProfileState] = useRecoilState(userProfileAtom);
  const keychain = useRecoilValue(keychainAtom);
  const isTokenExpired = useRecoilValue(isValidToken);
  const [showModal, toggleModal] = React.useState(false);

  React.useEffect(() => {
    analyticsActions.trackPage('Landing');
  });

  React.useEffect(() => {
    if (wallet && !keychain.checked) {
      console.log("wallet, keychain not checked", keychain);
      (async () => {
        await keychainActions.checkKeychainByKey();
      })();
    } else if(!anchorWallet && wallet) {
      console.log("no anchor no wallet ");
      (async () => {
        await keychainActions.resetKeychain(true);
      })();
    }
  }, [wallet])

  React.useEffect(() => {
    if (anchorWallet && !wallet) {
      console.log("Anchor wallet, no wallet");
      (async () => {
        await walletActions.connectWallet(anchorWallet, signMessage);
      })();
    }
  }, [anchorWallet])

  useAsyncEffect(async () => {
    if (keychain.checked) {
      console.log("keychain checked", keychain);
      // 2 options:
      // 1. if keychain exists and wallet is verified, go to home
      // 2. otherwise, navigate to the new wallet detected page
      if (keychain.walletVerified) {
        if(userProfileState.jwt === null){
          toggleModal(true);
        }
        // todo: navigate to profile page (logged in)
      } else {
        // todo: navigate to the verification screen
        props.navigation.navigate('WalletDetected');
      }
    }
    if (keychain.checked && keychain.walletVerified) {
      // todo: then we need to navigate to the "logged in" profile stack
        // then we need to navigate to new wallet detected screen
    }
  }, [keychain]);


  return (
    <ScreenWrapper>
      <LoginToKaizenModal showModal={showModal} toggleModal={toggleModal} />

      <View style={styles.subCon}>
        <View style={styles.card1}>
          <Image source={require("../assets/pngs/Keychain-Logo.png")} style={styles.logo} />
        </View>
        <NormalText style={styles.text}>
          Link multiple wallets to a single on-chain account and view your NFTs from any wallet you own.
        </NormalText>
        {/*<NormalText style={styles.text}>*/}
          {/*Built on Keychain and brought to you by the Kaizen Corps team.*/}
          {/*-A Kaizen Corps product.*/}
        {/*</NormalText>*/}
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
