import React, { FC, ReactElement } from "react";

//Components
import { View, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { FatPinkButton } from "../components/ui/buttons/buttons";
import { HeaderText, NormalText, SubHeaderText } from "../components/ui/text/text";
import { WalletRow } from "../components/wallet-header/wallet-header";

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
import { NOTI_STATUS, walletAtom } from "../_state";
import { useKeychainActions } from "../_actions/keychain.actions";
import useToasts from "../hooks/useToasts";

interface Props extends BottomTabScreenProps<RootStackParamList, 'VerifyWallet'> {}


const VerifyWallet : FC<any> = (props: Props) : ReactElement => {

  // const { address } = props.route.params;

  const { createToast } = useToasts();

  const [loading, toggleLoading] = React.useState(false);
  const keychain = useRecoilValue(keychainAtom);
  const wallet = useRecoilValue(walletAtom);
  // const user = useRecoilValue(userAtom);

  const keychainActions = useKeychainActions();

  const [isWalletPending, toggleWalletPending] = React.useState(false);

  React.useEffect(() => {
    // TODO toggle if a wallet is pending verification
  }, [])

  const goBack = () => props.navigation.goBack();

  const verifyWallet = async () => {
    toggleLoading(true);
    try {
      await keychainActions.verifyKey();
      createToast('Located wallet, and requested verification', NOTI_STATUS.SUCCESS);
      props.navigation.navigate('Profile')
    } catch (err) {
      createToast(`There was a problem while verifying: ${err}`, NOTI_STATUS.ERR);
    } finally {
      toggleLoading(false);
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
          <SubHeaderText style={{ color: Theme.COLORS.LABEL_TEXT_WHITE }}>{keychain.name}</SubHeaderText>
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
              <HeaderText style={{ color: Theme.COLORS.LABEL_TEXT_WHITE, padding: Theme.SPACING.SM }}>{formatAddress(wallet.address)}</HeaderText>
            </View>
            <NormalText style={styles.yellowText}>
              Found your Keychain! You can now verify this wallet.
            </NormalText>
            <FatPinkButton text={loading ? "LOADING..." : "VERIFY"} func={verifyWallet} />
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
    maxWidth: Theme.MAX_WIDTH_CON,
    minHeight: Theme.MIN_HEIGHT_CON,
  },
  addressCon: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Theme.SPACING.MD,
    borderRadius: Theme.BRADIUS.SM,
    backgroundColor: Theme.COLORS.BACKGROUND_BLACK,
    borderColor: Theme.COLORS.ACTIVE_PINK,
    borderWidth: StyleSheet.hairlineWidth,
    marginBottom: Theme.SPACING.MD
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
    backgroundColor: Theme.COLORS.MAIN_BACKGROUND_GRAY,
  },
  botCont_1:{
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    marginBottom: Theme.SPACING.MD
  },
  pinkText: {
    textAlign: 'center',
    marginBottom: Theme.SPACING.MD,
    color: Theme.COLORS.ACTIVE_PINK
  },
  yellowText: {
    color: Theme.COLORS.ALERT_YELLOW,
    width: '100%',
    textAlign: 'center',
    marginBottom: Theme.SPACING.MD
  },
  closeCon: {
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default VerifyWallet;
