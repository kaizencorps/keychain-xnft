import React, { FC, ReactElement } from "react";

//Components
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { BannerText, HeaderText, NormalText } from "../../components/ui/text/text";

//Types
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { RootStackParamList } from "../../nav/homeStack";

//Data
import { useRecoilValue } from "recoil";
import { nftsAtom } from "../../_state/keychain";
import { NOTI_STATUS } from "../../_state";

//SVGs
import Numeric1Box from '../../assets/svgs/Icons/numeric-1-box';
import Numeric2Box from '../../assets/svgs/Icons/numeric-2-box';
import Numeric3Box from '../../assets/svgs/Icons/numeric-3-box';
import Numeric4Box from '../../assets/svgs/Icons/numeric-4-box';
import Numeric5Box from '../../assets/svgs/Icons/numeric-5-box';

//Hooks
import useToasts from "../../hooks/useToasts";

//Styles
import * as Theme from '../../constants/theme';
import Close from "../../assets/svgs/Icons/close";

//Utils
import { formatAddress } from "../../utils/stringFormatting";
import { FatButton } from "../../components/ui/buttons/buttons";
import ScreenWrapper from "../../components/screenWrapper/screenWrapper";
import { useWalletActions } from "../../_actions/wallet.actions";
import { useKeychainActions } from "../../_actions/keychain.actions";
import {consoleLog} from "../../_helpers/debug";

interface Props extends BottomTabScreenProps<RootStackParamList, 'RemoveWallet'> {}


const RemoveWallet : FC<any> = (props: Props) : ReactElement => {

  const { keyState, index } = props.route.params;

  const { createToast } = useToasts();

  const [loading, toggleLoading] = React.useState(false);

  const keychainActions = useKeychainActions();

  const removeWallet = async () => {
    try{
      toggleLoading(true);
      consoleLog('removing wallet>>> ', keyState);
      await keychainActions.removeKey(keyState.wallet);
      createToast('Wallet removed.', NOTI_STATUS.DEFAULT);
      props.navigation.navigate('Profile');
    } catch (e) {
      consoleLog('error removing wallet', e);
      createToast('Error removing wallet from keychain', NOTI_STATUS.ERR);
    } finally {
      toggleLoading(false);
    }
  }

  const goBack = () => props.navigation.goBack();

  const getIcon = React.useMemo(() => {
    switch(index){
      case 0: return <Numeric1Box color={"#D5DDF9"} width={75} height={75} />
      case 1: return <Numeric2Box color={"#D5DDF9"} width={75} height={75} />
      case 2: return <Numeric3Box color={"#D5DDF9"} width={75} height={75} />
      case 3: return <Numeric4Box color={"#D5DDF9"} width={75} height={75} />
      case 4: return <Numeric5Box color={"#D5DDF9"} width={75} height={75} />
    }
  }, [index])


  return (
    <ScreenWrapper>
      <View style={styles.maxCon}>
        <View style={styles.topCon}>
          {getIcon}
          <BannerText style={{ color: Theme.COLORS.LABEL_TEXT_WHITE, marginTop: Theme.SPACING.LG, marginBottom: Theme.SPACING.SM }}>{`Wallet ${index + 1}`}</BannerText>
          <View style={styles.addressCon}>
            <HeaderText style={{ color: Theme.COLORS.LABEL_TEXT_WHITE }}>{formatAddress(keyState.wallet)}</HeaderText>
          </View>
        </View>
        <View style={styles.botCon}>
          <View style={{ flex: 1, alignItems: 'center' }}>
          {/*<NormalText style={{ color: Theme.COLORS.ACTIVE_PINK, marginBottom: Theme.SPACING.MD }}>{`${nfts.length} NFTs`}</NormalText>*/}
          {/*  <NormalText style={{ color: Theme.COLORS.ACTIVE_PINK, marginBottom: Theme.SPACING.MD }}>--- Collections</NormalText>*/}
            <FatButton
              text={loading ? 'REMOVING...' : "REMOVE WALLET"}
              color={Theme.COLORS.SCARY_RED}
              backgroundColor={Theme.COLORS.BUTTON_BACKGROUND_GRAY}
              func={removeWallet}

            />
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

export default RemoveWallet;
