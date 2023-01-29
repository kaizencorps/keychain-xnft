import React, { FC, ReactElement } from "react";

//Components
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { FatButton } from "../../components/ui/buttons/buttons";
import { SubHeaderText } from "../../components/ui/text/text";
import {WalletRow} from "../../components/wallet-header/wallet-header";
import ScreenWrapper from "../../components/screenWrapper/screenWrapper";

//Types
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { RootStackParamList } from "../../nav/homeStack";

//Data
import { keychainAtom, profilePictureUrl } from "../../_state";
import { useRecoilValue } from "recoil";

//Types
import { KeyState } from "../../types/NFT";

//Hooks
import { useKeychainActions } from "../../_actions/keychain.actions";


//SVGs
import Close from "../../assets/svgs/Icons/close";
import LogoutIcon from "../../assets/svgs/Icons/logout";
import AccountCircle from "../../assets/svgs/Icons/account-circle";

//Styles
import * as Theme from '../../constants/theme';


interface Props extends BottomTabScreenProps<RootStackParamList, 'Logout'> {}


const Logout : FC<any> = (props: Props) : ReactElement => {

  const keychain = useRecoilValue(keychainAtom);
  const keychainActions = useKeychainActions();
  const profilePic = useRecoilValue(profilePictureUrl);

  const logout = async () => {
    localStorage.clear();
    await keychainActions.resetKeychain(true);
    // Resetting keychain account will automatically force navigation back to Landing screen
  }

  const goBack = () => props.navigation.goBack();

  return (
    <ScreenWrapper>
      <View style={styles.maxCon}>
        <View style={styles.topCon}>
          <View style={styles.imageCon}>
            {!!profilePic ?
              <Image source={{ uri: profilePic }} style={{ height: 150, width: 150 }} />
            :
              <AccountCircle height={150} width={150} color={Theme.COLORS.INACTIVE_GRAY} />
            }
          </View>
          <SubHeaderText style={{ color: Theme.COLORS.LABEL_TEXT_WHITE, marginBottom: Theme.SPACING.MD }}>{keychain.name}</SubHeaderText>
          {keychain.keys.map((keyState: KeyState, i: number) =>
            <WalletRow key={i} keyState={keyState} conStyle={{ width: '50%' }} />
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
    alignItems: 'center',
    marginTop: Theme.SPACING.XL
  },
  imageCon: {
    borderRadius: 75,
    overflow: 'hidden'
  }
});

export default Logout;
