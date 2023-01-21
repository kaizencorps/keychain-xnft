import React, { FC, ReactElement } from "react";

//Components
import { View, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { FatPinkButton } from "../components/ui/buttons/buttons";
import { HeaderText, NormalText, SubHeaderText } from "../components/ui/text/text";
import { WalletRow, Wallet as WalletHeader } from "../components/wallet-header/wallet-header";

//Types
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { RootStackParamList } from "../nav/homeStack";

//Data
import { keychainAtom } from "../_state/keychain";
import { userAtom } from "../_state/user";
import { useRecoilValue } from "recoil";

//Web3
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

//SVGs
import Close from "../assets/svgs/Icons/close";
import Wallet from '../assets/svgs/Icons/wallet';
import AccountCircle from "../assets/svgs/Icons/account-circle";

//Styles
import * as Theme from '../constants/theme';

//Utils
import { formatAddress } from "../utils/stringFormatting";
import ScreenWrapper from "../components/screenWrapper/screenWrapper";
import { walletAtom } from "../_state";
import { useKeychainActions } from "../_actions/keychain.actions";
import useAsyncEffect from "use-async-effect";
import {consoleLog} from "../_helpers/debug";

interface Props extends BottomTabScreenProps<RootStackParamList, 'VerifyWallet'> {}


// this screen is part of landing stack (user not logged in yet)
const VerifyWallet : FC<any> = (props: Props) : ReactElement => {

  const keychain = useRecoilValue(keychainAtom);
  const wallet = useRecoilValue(walletAtom);
  const user = useRecoilValue(userAtom);

  const keychainActions = useKeychainActions();

  const [isWalletPending, toggleWalletPending] = React.useState(false);

  React.useEffect(() => {
    // TODO toggle if a wallet is pending verification
  }, [])

  const goBack = () => props.navigation.goBack();

  const verifyWallet = async () => {
    // todo: loading ..?
    try {
      await keychainActions.verifyKey();
    } catch (err) {
      // todo: handle w/error message or something
    } finally {
      // set not loading ..
    }
  }

  /* nav.tsx will swap to profile automatically when walletVerified gets set
  useAsyncEffect(async () => {
    consoleLog('got new keychain state: ', keychain);
    if (keychain.walletVerified) {
      consoleLog('todo: navigate to profile / logged in screen');
      // todo: navigate to logged in profile screen
    }
  }, [keychain]);
   */

  return (
    <ScreenWrapper>
      <View style={styles.maxCon}>
        <View style={styles.topCon}>
          <AccountCircle height={150} width={150} color={Theme.COLORS.INACTIVE_GRAY} />

          {/*{keychain ?*/}
          {/*  <AccountCircle height={150} width={150} color={Theme.COLORS.INACTIVE_GRAY} />*/}
          {/*:*/}
          {/*  <Image />*/}
          {/*}*/}
          <SubHeaderText style={{ color: Theme.COLORS.LABEL_TEXT_WHITE }}>{user.username}</SubHeaderText>
          {keychain.keys.map((keyState, i) =>
            <WalletRow
              conStyle={{ width: '50%' }}
              keyState={keyState}
            />
          )}
        </View>
        <View style={styles.botCon}>
          <View style={styles.botCont_1}>
            <View style={styles.addressCon}>
              <HeaderText style={{ color: Theme.COLORS.LABEL_TEXT_WHITE, padding:Theme.SPACING.MD}}>{formatAddress(wallet.address)}</HeaderText>
            </View>
            <NormalText style={{ color: Theme.COLORS.ALERT_YELLOW, width: '100%', textAlign: 'center'}}>
              To verify and link this wallet to your Keychain account, connect an existing verified wallet, add this wallet, then reconnect with this wallet
            </NormalText>
            <FatPinkButton text="VERIFY" func={verifyWallet} />
          </View>
          <View style={styles.closeCon}>
            <TouchableOpacity onPress={goBack}>
              <Close color={Theme.COLORS.INACTIVE_GRAY}/>
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
    height: '100%',
    maxWidth: Theme.MAX_WIDTH_CON,
    minHeight: Theme.MIN_HEIGHT_CON,
    display: 'flex',
    alignSelf: 'center'

  },
  addressCon: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Theme.SPACING.MD,
    borderRadius: Theme.BRADIUS.SM,
    backgroundColor: Theme.COLORS.BACKGROUND_BLACK,
    borderColor: Theme.COLORS.ACTIVE_PINK,
    borderWidth: 0.5
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
    //gap: Theme.SPACING.XXL,
    justifyContent: 'space-between',
    backgroundColor: Theme.COLORS.MAIN_BACKGROUND_GRAY,
  },
  botCont_1:{
    height: '30%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    gap: Theme.SPACING.XXL,

  },
  pinkText: {
    textAlign: 'center',
    marginBottom: Theme.SPACING.MD,
    color: Theme.COLORS.ACTIVE_PINK
  },
  closeCon: {
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default VerifyWallet;
