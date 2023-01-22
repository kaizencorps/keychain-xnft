import React, {FC, ReactElement, useState} from "react";

//Components
import { View, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { FatPinkButton } from "../components/ui/buttons/buttons";
import { BannerText, HeaderText, NormalText, SubHeaderText, ErrorText } from "../components/ui/text/text";
import ScreenWrapper from "../components/screenWrapper/screenWrapper";
import Input from "../components/ui/inputs/inputs";

//Types
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { RootStackParamList } from "../nav/homeStack";

//SVGs
import Close from "../assets/svgs/Icons/close";
import Chevron from '../assets/svgs/Icons/chevron';
import Shimmer from "../assets/svgs/Icons/shimmer";

//Utils
import { formatAddress } from "../utils/stringFormatting";

//Data
import { useKeychainActions } from "../_actions/keychain.actions";
import {keychainAtom, NOTI_STATUS, walletAtom } from "../_state";
import { useRecoilValue } from "recoil";

//Hooks
import useToasts from "../hooks/useToasts";
import useAsyncEffect from "use-async-effect";

//Styles
import * as Theme from '../constants/theme';
import { consoleLog } from "../_helpers/debug";


interface Props extends BottomTabScreenProps<RootStackParamList, 'CreateKeychain'> {}


const CreateKeychain : FC<any> = (props: Props) : ReactElement => {

  // const { address } = props.route.params;

  const { createToast } = useToasts();

  const [username, setUsername] = React.useState('');
  const [errorText, setErrorText] = React.useState('');
  const [loading, toggleLoading] = React.useState(false);

  const wallet = useRecoilValue(walletAtom);
  const keychain = useRecoilValue(keychainAtom);
  const keychainActions = useKeychainActions();

  const goBack = () => props.navigation.goBack();
  const goHome = () => props.navigation.navigate('Profile')

  const createKeychain = async () => {
    if(validate()){
      setErrorText(''); // Reset
      toggleLoading(true);
      consoleLog('creating keychain w/username: ', username);
      try {
        await keychainActions.createKeychain(username);
        createToast('Created keychain', NOTI_STATUS.SUCCESS);
      } catch (err) {
        createToast('Error creating keychain', NOTI_STATUS.ERR);
      } finally {
        toggleLoading(false);
        goHome();
      }
    } else {
      setErrorText('You must enter a keychain username')
    }
  }

  const validate = () => {
    return !!username.length;
  }

  useAsyncEffect(async () => {
    if (keychain.walletVerified) {
      goHome();
    }
  }, [keychain]);

  return (
    <ScreenWrapper>
      <View style={styles.maxCon}>
        <View style={styles.topCon}>
          <Shimmer height={75} width={75} />
          <BannerText style={{ color: Theme.COLORS.LABEL_TEXT_WHITE }}>Welcome!</BannerText>
          <NormalText style={{ color: Theme.COLORS.LABEL_TEXT_WHITE, textAlign: 'center' }}>Create a new keychain account with this wallet</NormalText>
           <View style={styles.addressCon}>
            <HeaderText style={{ color: Theme.COLORS.LABEL_TEXT_WHITE }}>{formatAddress(wallet.address)}</HeaderText>
          </View>
        </View>
        <View style={styles.botCon}>
          <View style={{ justifyContent: 'center' }}>
            <NormalText style={styles.pickText}>Choose a keychain username</NormalText>
            <Input val={username} onChangeText={setUsername} errorText={errorText} />
            <FatPinkButton text={loading ? "CREATING..." : "CREATE KEYCHAIN"} func={createKeychain} />
          </View>
          <View style={styles.closeCon}>
            <TouchableOpacity onPress={goBack}>
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
  pickText: {
    color: Theme.COLORS.ACTIVE_PINK,
    textAlign: 'center',
    marginBottom: Theme.SPACING.MD
  },
  errorText: {
    color: Theme.COLORS.SCARY_RED,
    marginBottom: Theme.SPACING.MD,
    textAlign: 'center'
  }
});

export default CreateKeychain;
