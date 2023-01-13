import React, {FC, ReactElement, useState} from "react";

//Components
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { FatPinkButton } from "../../components/ui/buttons";
import { BannerText, HeaderText, NormalText, SubHeaderText } from "../../components/ui/text";

//Types
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { RootStackParamList } from "../../nav/homeStack";

//SVGs
import Close from "../../assets/svgs/Icons/close";
import Chevron from '../../assets/svgs/Icons/chevron';
import Wallet from '../../assets/svgs/Icons/wallet';

//Utils
import { formatAddress } from "../../utils/stringFormatting";

//Styles
import * as Theme from '../../constants/theme';
import Input from "../../components/ui/inputs";


interface Props extends BottomTabScreenProps<RootStackParamList, 'CreateKeychain'> {}


const WalletDetected : FC<any> = (props: Props) : ReactElement => {

  const { address } = props.route.params;

  const [username, setUsername] = React.useState('')
  const [errorText, setErrorText] = React.useState('')

  const goBack = () => props.navigation.goBack();
  const goHome = () => props.navigation.navigate('Profile')

  const createKeychain = () => {
    // TODO 
    goHome();
  }

  return (
    <View style={styles.con}>
      <View style={styles.topCon}>
        <Wallet height={75} width={75} color={Theme.COLORS.LABEL_TEXT_WHITE} />
        <BannerText style={{ color: Theme.COLORS.LABEL_TEXT_WHITE }}>Welcome!</BannerText>
        <NormalText style={{ color: Theme.COLORS.LABEL_TEXT_WHITE, textAlign: 'center' }}>Create a new keychain account with this wallet</NormalText>
          <View style={styles.addressCon}>
            <HeaderText style={{ color: Theme.COLORS.LABEL_TEXT_WHITE }}>{formatAddress(address)}</HeaderText>
          </View>
      </View>
      <View style={styles.botCon}>
        <View>
          <NormalText style={{ color: Theme.COLORS.ACTIVE_PINK, textAlign: 'center' }}>Pick a keychain username</NormalText>
          <Input val={username} onChangeText={setUsername} isError={errorText.length} />
          {errorText.length && <NormalText style={{ color: Theme.COLORS.SCARY_RED, marginBottom: Theme.SPACING.MD }}>{errorText}</NormalText>}
          <FatPinkButton text="CREATE KEYCHAIN" func={createKeychain} />
        </View>
        <View style={styles.closeCon}>
          <TouchableOpacity onPress={goBack}>
            <Close color={Theme.COLORS.INACTIVE_GRAY }/>
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
  },
  swipeCon: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});

export default WalletDetected;