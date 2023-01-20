import React, {FC, ReactElement, useState} from "react";

//Components
import { View, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { FatPinkButton } from "../components/ui/buttons/buttons";
import { BannerText, HeaderText, NormalText, SubHeaderText } from "../components/ui/text/text";
import Input from "../components/ui/inputs/inputs";

//Types
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { RootStackParamList } from "../nav/homeStack";

//Hooks
import { useUserActions } from "../_actions/user.actions";

//SVGs
import Close from "../assets/svgs/Icons/close";
import Chevron from '../assets/svgs/Icons/chevron';
import Wallet from '../assets/svgs/Icons/wallet';

//Utils
import { formatAddress } from "../utils/stringFormatting";

//Styles
import * as Theme from '../constants/theme';
import {consoleLog} from "../_helpers/debug";
import { useKeychainActions } from "../_actions/keychain.actions";
import ScreenWrapper from "../components/screenWrapper/screenWrapper";


interface Props extends BottomTabScreenProps<RootStackParamList, 'WalletDetected'> {}


const WalletDetected : FC<any> = (props: Props) : ReactElement => {

  // const { address } = props.route.params;
  const address = "egvhw7e9vrsebv0w8vhrw89vw";

  const userActions = useUserActions();
  const keychainActions = useKeychainActions();

  const [username, setUsername] = React.useState('')
  const [errorText, setErrorText] = React.useState('');

  const goHome = () => props.navigation.navigate('Profile');
  const goToCreateNew = () => props.navigation.navigate('CreateKeychain', { address })

  const submitUsername = () => {
    // check for the keychain
    // todo: pull this name from the input
    const name = "test";
    keychainActions.checkKeychainByName(name);
    // If success userActions()
    // If fails, toggleError(true)
  }

  return (
    <ScreenWrapper>
      <View style={styles.maxCon}>
        <View style={styles.topCon}>
          <Wallet height={75} width={75} color={Theme.COLORS.LABEL_TEXT_WHITE} />
          <BannerText style={{ color: Theme.COLORS.LABEL_TEXT_WHITE }}>New wallet detected!</BannerText>
            <View style={styles.addressCon}>
              <HeaderText style={{ color: Theme.COLORS.LABEL_TEXT_WHITE }}>{formatAddress(address)}</HeaderText>
            </View>
        </View>
        <View style={styles.botCon}>
          <View>
            <NormalText style={styles.topText}>Enter your keychain username to add this wallet to your account</NormalText>
            <Input val={username} onChangeText={setUsername} isError={errorText.length} />
            {!!errorText.length && <NormalText style={{ color: Theme.COLORS.SCARY_RED, marginBottom: Theme.SPACING.MD }}>{errorText}</NormalText>}
            <FatPinkButton text="SUBMIT" func={submitUsername} />
            <NormalText style={{ color: Theme.COLORS.LABEL_TEXT_WHITE, marginTop: Theme.SPACING.LG }}>Don't have a keychain account?</NormalText>
            <TouchableOpacity onPress={goToCreateNew}>
              <NormalText style={{ color: Theme.COLORS.ACTIVE_PINK }}>CREATE NEW</NormalText>
            </TouchableOpacity>
          </View>
          <View style={styles.closeCon}>
            <TouchableOpacity onPress={goHome}>
              <Close color={Theme.COLORS.INACTIVE_GRAY }/>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({

  maxCon: {
    width: '100%',
    maxWidth: Theme.MAX_WIDTH_CON,
    minHeight: Theme.MIN_HEIGHT_CON,
  },
  addressCon: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: Theme.SPACING.MD,
    borderRadius: Theme.BRADIUS.XL,
    backgroundColor: Theme.COLORS.BACKGROUND_BLACK
  },
  topCon: {
    backgroundColor: Theme.COLORS.MAIN_BACKGROUND_BLACK,
    padding: Theme.SPACING.LG,
    justifyContent: 'center',
    alignItems: 'center'
  },
  botCon: {
    flex: 1,
    padding: Theme.SPACING.LG,
    justifyContent: 'space-between',
    backgroundColor: Theme.COLORS.MAIN_BACKGROUND_GRAY
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
  },
  topText: {
    color: Theme.COLORS.ACTIVE_PINK,
    textAlign: 'center',
    marginBottom: Theme.SPACING.SM
  }
});

export default WalletDetected;
