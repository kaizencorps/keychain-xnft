import React, { FC, ReactElement } from "react";

//Components
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { BannerText, HeaderText, NormalText } from "../../components/ui/text";

//Types
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { RootStackParamList } from "../../nav/homeStack";

//SVGs
import Wallet from '../../assets/svgs/Icons/wallet';

//Styles
import * as Theme from '../../constants/theme';
import Close from "../../assets/svgs/Icons/close";

//Utils
import { formatAddress } from "../../utils/stringFormatting";
import { FatButton } from "../../components/ui/buttons";

interface Props extends BottomTabScreenProps<RootStackParamList, 'RemoveWallet'> {}


const RemoveWallet : FC<any> = (props: Props) : ReactElement => {

  const { address, index } = props.route.params;

  const removeWallet = () => {
    // TODO
  }

  const goBack = () => props.navigation.goBack();

  return (
    <View style={styles.con}>
      <View style={styles.maxCon}>
        <View style={styles.topCon}>
          <Wallet color={Theme.COLORS.LABEL_TEXT_WHITE} height={75} width={75} />
          <BannerText style={{ color: Theme.COLORS.ALERT_YELLOW, marginTop: Theme.SPACING.LG, marginBottom: Theme.SPACING.SM }}>{`Wallet ${index}`}</BannerText>
          <View style={styles.addressCon}>
            <HeaderText style={{ color: Theme.COLORS.BACKGROUND_BLACK }}>{formatAddress(props.route.params.address)}</HeaderText>
          </View>
        </View>
        <View style={styles.botCon}>
          <View style={{ alignItems: 'center' }}>
            <NormalText style={{ color: Theme.COLORS.ACTIVE_PINK }}>--- NFTs</NormalText>
            <NormalText style={{ color: Theme.COLORS.ACTIVE_PINK }}>--- Collections</NormalText>
            <FatButton
              text="REMOVE WALLET"
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
    </View>
  );
}

const styles = StyleSheet.create({
  con: {
    flex: 1,
    paddingTop: Theme.SPACING.XXL,
    backgroundColor: Theme.COLORS.USER_BACKGROUND_GRAY,
    justifyContent: 'center', 
    alignItems: 'center'
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
    flexDirection: 'row',
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
