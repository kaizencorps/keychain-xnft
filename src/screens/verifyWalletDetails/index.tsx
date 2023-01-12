import React, {FC, ReactElement, useState} from "react";

//Components
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Input from "../../components/ui/inputs";

//Types
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { RootStackParamList } from "../../nav/homeStack";

//SVGs
import Wallet from '../../assets/svgs/Icons/wallet';

//Styles
import * as Theme from '../../constants/theme';
import { BannerText, HeaderText, SubHeaderText } from "../../components/ui/text";
import Close from "../../assets/svgs/Icons/close";
import { FatPinkButton } from "../../components/ui/buttons";

//Utils
import { formatAddress } from "../../utils/stringFormatting";

interface Props extends BottomTabScreenProps<RootStackParamList, 'VerifyWalletDetails'> {
  // other props ...
}


const VerifyWalletDetails : FC<any> = (props: Props) : ReactElement => {

  const [input, setInput] = React.useState('')

  const connectWallet = () => {

  }

  const goBack = () => props.navigation.goBack();

  return (
    <View style={styles.con}>
      <View style={styles.topCon}>
        <Wallet color={Theme.COLORS.LABEL_TEXT_WHITE} height={75} width={75} />
        <BannerText style={{ color: Theme.COLORS.ALERT_YELLOW, marginTop: Theme.SPACING.LG, marginBottom: Theme.SPACING.SM }}>Wallet pending</BannerText>
        <View style={styles.addressCon}>
          {/* <HeaderText style={{ color: Theme.COLORS.ALERT_YELLOW}}>{formatAddress(props.route.params.address)}</HeaderText> */}
        </View>
      </View>
      <View style={styles.botCon}>
        <View>
          <SubHeaderText style={styles.pinkText}>To link this wallet to this keychain account, please sign in to verify the wallet</SubHeaderText>
          <Input 
            val={input}
            onChangeText={setInput}
          />
          <FatPinkButton 
            text="CONNECT WALLET" 
            func={connectWallet} 
            icon={<Wallet color={Theme.COLORS.LABEL_TEXT_WHITE }/>}
          />
        </View>
        <View style={styles.closeCon}>
          <TouchableOpacity onPress={goBack}>
            <Close color={Theme.COLORS.INACTIVE_GRAY} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  con: {
    flex: 1,
    paddingTop: Theme.SPACING.XXL,
    backgroundColor: Theme.COLORS.USER_BACKGROUND_GRAY,
  },
  addressCon: {
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: Theme.SPACING.MD,
    borderRadius: Theme.BRADIUS.XL,
    backgroundColor: Theme.COLORS.BACKGROUND_BLACK
  },
  topCon: {
    backgroundColor: Theme.COLORS.BACKGROUND_BLACK,
    padding: Theme.SPACING.LG,
    justifyContent: 'center', 
    alignItems: 'center'
  },
  botCon: {
    flex: 1,
    padding: Theme.SPACING.LG,
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  pinkText: {
    textAlign: 'center',
    marginBottom: Theme.SPACING.MD,
    color: Theme.COLORS.ACTIVE_PINK
  },
  closeCon: {
    width: '100%',
    justifyContent: 'center', 
    alignItems: 'center'
  }
});

export default VerifyWalletDetails;
