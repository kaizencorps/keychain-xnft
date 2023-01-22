import React, { FC, ReactElement } from "react";

//Components
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import ScreenWrapper from "../../components/screenWrapper/screenWrapper";

//Types
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { RootStackParamList } from "../../nav/homeStack";

//SVGs
import Wallet from '../../assets/svgs/Icons/wallet';

//Styles
import * as Theme from '../../constants/theme';
import { BannerText, HeaderText, SubHeaderText } from "../../components/ui/text/text";
import Close from "../../assets/svgs/Icons/close";
import { FatPinkButton } from "../../components/ui/buttons/buttons";

//Utils
import { formatAddress } from "../../utils/stringFormatting";

//Data
import {useRecoilValue} from "recoil";
import {keychainAtom, NOTI_STATUS, walletAtom} from "../../_state";
import {useUserActions} from "../../_actions/user.actions";
import {useKeychainActions} from "../../_actions/keychain.actions";
import useToasts from "../../hooks/useToasts";

interface Props extends BottomTabScreenProps<RootStackParamList, 'PendingWallet'> {}


const PendingWallet : FC<any> = (props: Props) : ReactElement => {

  const { createToast } = useToasts();

  const [loading, toggleLoading] = React.useState(false);

  const wallet = useRecoilValue(walletAtom);

  const goBack = () => props.navigation.goBack();

  return (
    <ScreenWrapper>
      <View style={styles.maxCon}>
        <View style={styles.topCon}>
          <Wallet color={Theme.COLORS.LABEL_TEXT_WHITE} height={75} width={75} />
          <BannerText style={{ color: Theme.COLORS.ALERT_YELLOW, marginTop: Theme.SPACING.LG, marginBottom: Theme.SPACING.SM }}>Wallet Pending</BannerText>
          <View style={styles.addressCon}>
            <HeaderText style={{ color: Theme.COLORS.ALERT_YELLOW }}>{formatAddress(props.route.params.address)}</HeaderText>
          </View>
        </View>
        <View style={styles.botCon}>
          <View style={{ justifyContent: 'center' }}>
            <SubHeaderText style={styles.pinkText}>To verify this added wallet, connect with the wallet and use your username to look up your Keychain account.</SubHeaderText>
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
  con: {
    flex: 1,
    paddingTop: Theme.SPACING.XXL,
    backgroundColor: Theme.COLORS.BACKGROUND_BLACK,
    justifyContent: 'center',
    alignItems: 'center',
  },
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
  }
});

export default PendingWallet;
