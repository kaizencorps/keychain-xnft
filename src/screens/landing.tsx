import React from 'react';

//Components
import { View, StyleSheet, Image } from 'react-native';
import { Box } from '../components/ui/text-box/text-box';
import { HeaderText, NormalText } from '../components/ui/text/text';

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


interface Props extends BottomTabScreenProps<RootStackParamList, 'Landing'> { }


const Landing : React.FC<any> = (props: Props) : React.ReactElement => {


  return (
    <View style={styles.con}>
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

export default Landing;
