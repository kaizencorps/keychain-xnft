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
import { useRecoilValue } from "recoil";
import {keychainAtom, walletAtom } from "../_state";
import useAsyncEffect from "use-async-effect";


interface Props extends BottomTabScreenProps<RootStackParamList, 'WalletDetected'> {}


const WalletDetected : FC<any> = (props: Props) : ReactElement => {

  // const { address } = props.route.params;
  const wallet = useRecoilValue(walletAtom);
  const keychain = useRecoilValue(keychainAtom);

  const userActions = useUserActions();
  const keychainActions = useKeychainActions();

  const [username, setUsername] = React.useState('')
  const [errorText, setErrorText] = React.useState('');
  const [checked, setChecked] = React.useState(false);

  const goHome = () => props.navigation.navigate('Profile');
  const goToCreateNew = () => {
    consoleLog('navigating to CreateKeychain ');
    props.navigation.navigate('CreateKeychain');
  }

  const submitUsername = async () => {
    // check for the keychain
    try {
      // todo: loading
      await keychainActions.checkKeychainByName(username);
      setChecked(true);
    } catch (err) {
      setErrorText(`There was a problem accessing the Keychain for ${username}`);
      consoleLog('problem trying to check keychain by name', err);
      // todo: handle with message ..?
    }
  }

  useAsyncEffect(async () => {
    consoleLog('got new keychain state: ', keychain);
    if (checked) {
      if (keychain.keychainAccount) {
        // then the keychain exists
        // if the wallet is added but not verified, then we need to navigate to the verify screen
        if (keychain.walletAdded && !keychain.walletVerified) {
          // the walletVerified check is a bit redundant if we're on this screen, but it's here for clarity
          consoleLog('navigating to VerifyWallet');
          props.navigation.navigate('VerifyWallet');
        } else {
          // in this case, the keychain exists, but doesn't have the user's wallet as an added key
          setErrorText('This Keychain exists, but doesn\'t have your connected wallet linked to it. If this is your Keychain, log back in with one of your verified keys to add this wallet, then log back in with this wallet to verifiy it.');
        }
      } else {
        // keychain doesn't exist
        setErrorText('A Keychain for that username was not found.');
      }
    }

  //nav.tsx will swap to profile automatically when walletVerified gets set
    /* todo: remove this once verified
  if (keychain.walletVerified) {
    //
    consoleLog('todo: navigate to profile / logged in screen');
    // todo: navigate to logged in profile screen
  }
     */
}, [keychain, checked]);

return (
  <ScreenWrapper>
    <View style={styles.maxCon}>
      <View style={styles.topCon}>
        <Wallet height={75} width={75} color={Theme.COLORS.LABEL_TEXT_WHITE} />
        <BannerText style={{ color: Theme.COLORS.LABEL_TEXT_WHITE }}>New wallet detected!</BannerText>
          <View style={styles.addressCon}>
            <HeaderText style={{ color: Theme.COLORS.LABEL_TEXT_WHITE }}>{formatAddress(wallet.address.toBase58())}</HeaderText>
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
