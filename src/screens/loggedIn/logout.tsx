import React, { FC, ReactElement } from "react";

//Components
import { View, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { FatButton } from "../../components/ui/buttons/buttons";
import { SubHeaderText } from "../../components/ui/text/text";
import {WalletRow} from "../../components/wallet-header/wallet-header";
import ScreenWrapper from "../../components/screenWrapper/screenWrapper";

//Types
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { RootStackParamList } from "../../nav/homeStack";

//Data
import { keychainAtom, userAtom } from "../../_state";
import { useRecoilValue } from "recoil";

//SVGs
import Close from "../../assets/svgs/Icons/close";
import LogoutIcon from "../../assets/svgs/Icons/logout";
import AccountCircle from "../../assets/svgs/Icons/account-circle";

//Styles
import * as Theme from '../../constants/theme';

//Utils
import { useWalletActions } from "../../_actions/wallet.actions";
import { KeyState } from "../../types/NFT";

interface Props extends BottomTabScreenProps<RootStackParamList, 'Logout'> {}


const Logout : FC<any> = (props: Props) : ReactElement => {

  const keychain = useRecoilValue(keychainAtom);
  const user = useRecoilValue(userAtom);
  const walletActions = useWalletActions();

  const logout = () => {
    // TODO clear localStorage and all other data
    walletActions.disconnectWallet();
    props.navigation.navigate('Landing');
  }

  const goBack = () => props.navigation.goBack();

  return (
    <ScreenWrapper>
      <View style={styles.maxCon}>
        <View style={styles.topCon}>
          <AccountCircle height={150} width={150} color={Theme.COLORS.INACTIVE_GRAY} />
          <SubHeaderText style={{ color: Theme.COLORS.LABEL_TEXT_WHITE }}>{user.username}</SubHeaderText>
          {keychain.keys.map((keyState: KeyState) =>
            <WalletRow keyState={keyState} conStyle={{ width: '50%' }} />
          )}
        </View>
        <View style={styles.botCon}>
          <FatButton
            text="LOGOUT"
            color={Theme.COLORS.SCARY_RED}
            backgroundColor={Theme.COLORS.BUTTON_BACKGROUND_GRAY}
            func={logout}
            icon={<LogoutIcon color={Theme.COLORS.SCARY_RED} />}
          />
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
    flexDirection: 'column',
    backgroundColor: Theme.COLORS.MAIN_BACKGROUND_GRAY,
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

export default Logout;
