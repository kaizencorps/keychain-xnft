import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text} from 'react-native';
import { Box } from '../../components/ui/text-box/index';
import * as Theme from "../../constants/theme";
import  Chevron from '../../assets/svgs/Icons/chevron';
import Wallet from '../../assets/svgs/Icons/wallet'
import { NormalText } from '../../components/ui/text';

const Landing : React.FC<any> = () : React.ReactElement => {

  return (
    <View style={styles.con}>
      <View style={styles.subCon}>
        <View style={styles.card1}>
          <Image source={require("../../assets/pngs/Keychain-Logo.png")} style={styles.logo} />
          <NormalText style={styles.text}>Keychain is an on-chain component that combines your NFTs from multiple wallets to be accessible by one account.
          </NormalText>
        </View>
        <View style={styles.card2}>
          <NormalText style={styles.text2}>HOW IT WORKS</NormalText>
          <Box letras='Connect a wallet to create a profile.'></Box>
          <Chevron color={Theme.COLORS.ACTIVE_PINK} rotation={90}/>
          <Box letras='Add another wallet to your profile.'></Box>
          <Chevron color={Theme.COLORS.ACTIVE_PINK} rotation={90}/>
          <Box letras='View all your NFTs in the gallery.'></Box>
          <TouchableOpacity style={styles.text2}>
            <Wallet color={Theme.COLORS.LABEL_TEXT_WHITE} width={10} height={10}/>
            <NormalText >CONNECT WALLET</NormalText>
          </TouchableOpacity>

        </View>
        
      </View>      

    </View>
  )
}

const styles = StyleSheet.create({
  con: {
    display:"flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
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
    margin: 10
  },
  logo:{
    width:16,
    height: 16, 
  },
  text: {
    color: Theme.COLORS.LABEL_TEXT_WHITE,
    lineHeight: 6,
    maxWidth: 500,
    textAlign: "center",
    fontFamily: 'BlenderPro-Bold',
    paddingVertical: 16,
  },
  text2: {
    fontFamily: 'BlenderPro-Bold',
    color: Theme.COLORS.ACTIVE_PINK,
    paddingBottom: 16 
  },
  tex3:{
    margin:32
  },
  button:{
    width: "100%",
    borderRadius: Theme.BRADIUS.XL,
    margin: 16,
    backgroundColor: Theme.COLORS.ACTIVE_PINK, 
    color: Theme.COLORS.LABEL_TEXT_WHITE,
    fontSize: 32,
    fontFamily: 'BlenderPro-Bold',
    display: "flex",
    justifyContent: "center",
    padding: 10, 
    marginHorizontal: 5
}
});

export default Landing;