import React, {FC, ReactElement, useState} from "react";

//Components
import { View, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import ScreenWrapper from "../../components/screenWrapper/screenWrapper";
import Input from "../../components/ui/inputs/inputs";
import { ErrorText } from "../../components/ui/text/text";

//Types
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { RootStackParamList } from "../../nav/homeStack";

//SVGs
import Wallet from '../../assets/svgs/Icons/wallet';

//Styles
import * as Theme from '../../constants/theme';
import { BannerText, SubHeaderText } from "../../components/ui/text/text";
import Close from "../../assets/svgs/Icons/close";
import { FatPinkButton } from "../../components/ui/buttons/buttons";
import {consoleLog} from "../../_helpers/debug";
import { useKeychainActions } from "../../_actions/keychain.actions";
import {PublicKey} from "@solana/web3.js";

interface Props extends BottomTabScreenProps<RootStackParamList, 'AddNewWallet'> {}


const AddNewWallet : FC<any> = (props: Props) : ReactElement => {

  const [input, setInput] = React.useState('')
  const [loading, toggleLoading] = React.useState(false);
  const [errorText, setErrorText] = React.useState('');
  const keychainActions = useKeychainActions();

  const validate = () => {
    return input.length >= 32 && input.length <= 44;
  }

  const submitNewWallet = async () => {
    if(validate()){
      let addingWalletAddress = null;
      try {
        addingWalletAddress = new PublicKey(input);
      } catch (e) {
        // invalid address
        setErrorText('You must enter a valid Solana wallet address');
      }
      setErrorText('');
      toggleLoading(true);
      try {
        await keychainActions.addKey(addingWalletAddress);
        props.navigation.navigate('PendingWallet', {address: addingWalletAddress});
      } catch (e) {
        setErrorText('There was an error adding your wallet: ' + e.message);
      } finally {
        toggleLoading(false);
      }
    } else {
      setErrorText('You must enter a valid Solana wallet address');
    }
  }

  const goBack = () => props.navigation.goBack();

  return (
    <ScreenWrapper>
      <View style={styles.maxCon}>
        <View style={styles.topCon}>
          <Wallet color={Theme.COLORS.LABEL_TEXT_WHITE} height={75} width={75} />
          <BannerText style={{ color: Theme.COLORS.LABEL_TEXT_WHITE, marginTop: Theme.SPACING.LG }}>Add New Wallet</BannerText>
        </View>
        <View style={styles.botCon}>
          <View style={{ justifyContent: 'center' }}>
            <SubHeaderText style={styles.pinkText}>Enter a wallet you want to add to your Keychain account</SubHeaderText>
            <Input
              val={input}
              onChangeText={setInput}
              errorText={errorText}
            />
            <FatPinkButton text={loading ? "LOADING..." : "SUBMIT"} func={submitNewWallet} />
          </View>
          <View style={styles.closeCon}>
            <TouchableOpacity onPress={goBack}>
              <Close color={Theme.COLORS.INACTIVE_GRAY} />
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
  }
});

export default AddNewWallet;
