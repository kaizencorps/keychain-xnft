import React, {FC, ReactElement, useState} from "react";

//Components
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { FatPinkButton } from "../../components/ui/buttons";
import { BannerText, HeaderText, NormalText, SubHeaderText } from "../../components/ui/text";
import Input from "../../components/ui/inputs";

//Types
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { RootStackParamList } from "../../nav/homeStack";

//Hooks
import { useUserActions } from "../../_actions/user.actions";

//SVGs
import Close from "../../assets/svgs/Icons/close";
import Chevron from '../../assets/svgs/Icons/chevron';
import Wallet from '../../assets/svgs/Icons/wallet';

//Utils
import { formatAddress } from "../../utils/stringFormatting";

//Styles
import * as Theme from '../../constants/theme';


interface Props extends BottomTabScreenProps<RootStackParamList, 'WalletDetected'> {}


const WalletDetected : FC<any> = (props: Props) : ReactElement => {

  const { address } = props.route.params;

  const userActions = useUserActions();

  const [username, setUsername] = React.useState('')
  const [errorText, setErrorText] = React.useState('');



  const goHome = () => props.navigation.navigate('Profile');

  const submitUsername = () => {
    // TODO
    // If success userActions()
    // If fails, toggleError(true)
  }

  return (
    <View style={styles.con}>
      <View style={styles.topCon}>
        <Wallet height={75} width={75} color={Theme.COLORS.LABEL_TEXT_WHITE} />
        <BannerText>{formatAddress(address)}</BannerText>
          <View style={styles.addressCon}>
            <HeaderText style={{ color: Theme.COLORS.LABEL_TEXT_WHITE }}>{formatAddress(props.route.params.address)}</HeaderText>
          </View>
      </View>
      <View style={styles.botCon}>
        <View>
          <NormalText style={{ color: Theme.COLORS.ACTIVE_PINK, textAlign: 'center' }}>Enter your keychain username to add this wallet to your account</NormalText>
          <Input val={username} onChangeText={setUsername} isError={errorText.length} />
          {errorText.length && <NormalText style={{ color: Theme.COLORS.SCARY_RED, marginBottom: Theme.SPACING.MD }}>{errorText}</NormalText>}
          <FatPinkButton text="SUBMIT" func={submitUsername} />
          <NormalText style={{ color: Theme.COLORS.LABEL_TEXT_WHITE }}>Don't have a keychain account?</NormalText>
          <NormalText style={{ color: Theme.COLORS.ACTIVE_PINK }}>CREATE NEW</NormalText>
        </View>
        <View style={styles.closeCon}>
          <TouchableOpacity onPress={goHome}>
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