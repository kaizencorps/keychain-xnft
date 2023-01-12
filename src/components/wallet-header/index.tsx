import React, { FC, ReactElement } from "react";

//Components
import { View, StyleSheet, TouchableOpacity, Image, GestureResponderEvent } from 'react-native';
import { HeaderText, NormalText, SubHeaderText } from "../../components/ui/text";

//SVGs
import Numeric1Box from '../../assets/svgs/Icons/numeric-1-box';
import Numeric2Box from '../../assets/svgs/Icons/numeric-2-box';
import Numeric3Box from '../../assets/svgs/Icons/numeric-3-box';
import Numeric4Box from '../../assets/svgs/Icons/numeric-4-box';
import Numeric5Box from '../../assets/svgs/Icons/numeric-5-box';
import Plus from "../../assets/svgs/Icons/plus";
import Alert from "../../assets/svgs/Icons/alert";

//Styles
import * as Theme from '../../constants/theme';

//Utils
import { formatAddress } from "../../utils/stringFormatting";

interface WalletProps {
  index: number,
  address: string
  func: (event: GestureResponderEvent) => void
}

interface NewWalletProps {
  func: (event: GestureResponderEvent) => void
}

interface VeryifyWalletProps {
  address: string
}

export const Wallet : FC<any> = (props: WalletProps) : ReactElement => {

  const getIcon = React.useCallback(() => {
    switch(props.index){
      case 1: return <Numeric1Box color={"#D5DDF9"} />
      case 2: return <Numeric2Box color={"#D5DDF9"} />
      case 3: return <Numeric3Box color={"#D5DDF9"} />
      case 4: return <Numeric4Box color={"#D5DDF9"} />
      case 5: return <Numeric5Box color={"#D5DDF9"} />
    }
  }, [])

  return (
    <TouchableOpacity style={[styles.con, { backgroundColor: Theme.COLORS.HEADER_BACKGROUND_GRAY }]}>
      {getIcon()}
      <SubHeaderText style={{ marginLeft: Theme.SPACING.SM, color: Theme.COLORS.HEADER_GRAY }}>{formatAddress(props.address)}</SubHeaderText>
    </TouchableOpacity>
  )
}

export const NewWallet : FC<any> = (props: NewWalletProps) : ReactElement => {

  return(
    <TouchableOpacity onPress={props.func} style={[styles.con, { backgroundColor: Theme.COLORS.SUBTLE_PINK }]}>
      <Plus color={Theme.COLORS.ACTIVE_PINK} />
      <SubHeaderText style={{ marginLeft: Theme.SPACING.SM, color: Theme.COLORS.HEADER_GRAY }}>Add new wallet</SubHeaderText>
    </TouchableOpacity>
  )
}

export const VerifyWallet : FC<any> = (props: VeryifyWalletProps) : ReactElement => {

  return (
    <View style={[styles.con, { backgroundColor: Theme.COLORS.SUBTLE_YELLOW }]}>
      <Alert color={Theme.COLORS.ALERT_YELLOW} />
      <SubHeaderText style={{ marginLeft: Theme.SPACING.SM, color: Theme.COLORS.HEADER_GRAY }}>{formatAddress(props.address)}</SubHeaderText>
    </View>
  )
}

const styles = StyleSheet.create({
  con: {
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: Theme.SPACING.MD,
    borderRadius: Theme.SPACING.SM,
    marginBottom: Theme.SPACING.SM
  }
});